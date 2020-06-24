// api 
import { fetchResource, asyncResource } from '@/api/resource';

// types 
export const REQUEST_LOADING= 'REQUEST_LOADING';
export const TREE_SEL_DATA= 'TREE_SEL_DATA';
export const TREE_SEL_ALL= 'TREE_SEL_ALL';


const resource = {
  state: {
    loading: false,
    treeSelData: [],
    treeSelAll: [],
  },
  actions: {
      reqLoading(context,params) {
          context.commit("REQUEST_LOADING",params);
      },
    // vue-selTree
    async getTreeSelData ({ commit }, id) {
        // commit(REQUEST_LOADING,true);
      try {
          if(id){
              const data = await asyncResource({ parentId: id});
              commit(TREE_SEL_DATA, { data, id });
          }else{
              const data = await asyncResource();
              commit(TREE_SEL_DATA, { data});
          }
      } catch (err) {
          commit(REQUEST_LOADING,false);
      }
    },
    getTreeSelAll ({ commit }) {
      fetchResource().then((data) => {
          commit(TREE_SEL_ALL, { data });
      })
    },
  },
  mutations: {
    [REQUEST_LOADING]: (state, params) => {
      state.loading = params;
    },
    [TREE_SEL_DATA]: (state, payload) => {
      const { id, data } = payload;
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
        const setChild = (tree) => tree.map((it) => {
           if(it.id === id) {
             return { ...it, childrens: resData }
           } else if (it.childrens && it.childrens.length > 0) {
             return { ...it, childrens: setChild(it.childrens) };
           } else {
             return it
           }
        });
        state.treeSelData = setChild(state.treeSelData);
      }
    },
     // tree全数据
    [TREE_SEL_ALL]: (state, payload) => {
          const { data } = payload;
          state.treeSelAll = data.data;
      }
  }
}

export default resource;