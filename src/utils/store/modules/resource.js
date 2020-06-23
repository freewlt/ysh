// api 
import { asyncResource } from '@/api/resource';

// types 
export const TREE_SEL_DATA_REQUEST= 'TREE_SEL_DATA_REQUEST';
export const TREE_SEL_DATA_SUCCESS= 'TREE_SEL_DATA_SUCCESS';
export const TREE_SEL_DATA_FAILURE= 'TREE_SEL_DATA_FAILURE';


const resouce = {
  state: {
    treeSelData: [
      {
        id: '1',
        parentId: '',
        name: '菜单1',
        childrens: [
         {
          id: '2', 
          parentId: '1',
          name: '菜单2',
         }
        ]
      }
    ],
    loading: false,
  },
  actions: {
    async getTreeSelData ({ commit }, id) {
      commit(TREE_SEL_DATA_REQUEST);
      try {
        const data = await asyncResource({ parentId: id || ''});
        commit(TREE_SEL_DATA_SUCCESS, { data, id });
      } catch {
        commit(TREE_SEL_DATA_FAILURE);
      }
    }
  },
  mutations: {
    [TREE_SEL_DATA_REQUEST]: (state) => {
      state.loading = true;
    },
    [TREE_SEL_DATA_SUCCESS]: (state, payload) => {
      const { id, data } = payload;
      if (!id) {
        state.treeSelData = data;
      } else {
        const setChild = (tree) => tree.map((it) => {
          if (it.parentId === id) {
            return { ...it, childrens: data }
          } else if (it.childrens && it.childrens.length > 0) {
            return { ...it, childrens: setChild(it.childrens) };
          } else {
            return it;
          }
        });
        state.treeSelData = setChild(state.treeSelData);
      }
    },
    [TREE_SEL_DATA_SUCCESS]: (state) => {
      state.loading = false;
    },
  }
}

export default resouce;