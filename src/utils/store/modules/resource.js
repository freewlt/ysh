// api 
import { asyncResource } from '@/api/resource';

// types 
export const TREE_SEL_DATA_REQUEST= 'TREE_SEL_DATA_REQUEST';
export const TREE_SEL_DATA_FAILURE= 'TREE_SEL_DATA_FAILURE';
export const TREE_SEL_DATA_SUCCESS= 'TREE_SEL_DATA_SUCCESS';

const resource = {
  state: {
    treeSelData: [],
    loading: false,
  },
  actions: {
    // vue-selTree
    async getTreeSelData ({ commit }, id, parentNode, callback) {
      commit(TREE_SEL_DATA_REQUEST);
      // const id = params.id;
      try {
          // const data = await asyncResource({ parentId: id || ''});
          // commit(TREE_SEL_DATA_SUCCESS, { data, id });
          if(id){
              const data = await asyncResource({ parentId: id});
              commit(TREE_SEL_DATA_SUCCESS, { data, id, parentNode, callback });
          }else{
              const data = await asyncResource();
              commit(TREE_SEL_DATA_SUCCESS, { data});
          }
      } catch (err) {
        commit(TREE_SEL_DATA_FAILURE);
      }
        // callback()
    },
  },
  mutations: {
    [TREE_SEL_DATA_REQUEST]: (state) => {
      state.loading = true;
    },
    [TREE_SEL_DATA_FAILURE]: (state) => {
        state.loading = false;
    },
    [TREE_SEL_DATA_SUCCESS]: (state, payload) => {
      const { id, data, parentNode, callback } = payload;
        const resData = data.data
        resData.map((it) => {
          // if (it.parentFlag){
          if(it.childCount > 0){
              it.childrens = null;
          }else{
              delete it.childrens;
          }
      })
      if (!id) {
          state.treeSelData = resData;
      } else {
          // state.treeSelData = resData;
          // const childrenpar =  parentNode.childrens
          parentNode.childrens =resData
          // state.treeSelData.map((it) => {
          //     if (it.id === id) {
          //         it.chilrends = resData
          //     }
          //   });
          // state.treeSelData = setChild
              // state.treeSelData = setChild(state.treeSelData);
        // const setChild = (tree) => tree.map((it) => {
        //     return { ...it, childrens: setChild(it.childrens) };
        //    // if (it.parentId === id) {
        //    //   return { ...it, childrens: resData }
        //    // } else if (it.childrens && it.childrens.length > 0) {
        //    //   return { ...it, childrens: setChild(it.childrens) };
        //    // } else {
        //    //   return it
        //    // }
        // // });
        //   state.treeSelData = setChild(state.treeSelData);
          callback()

          console.log(parentNode,'eg')
          console.log(callback())
      }
    }
  }
}

export default resource;