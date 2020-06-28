/**
 * Created by Administrator on 2020/6/28.
 */
import { asyncResource } from "@/api/permission";

export const REQUEST_LOADING = "REQUEST_LOADING";
export const TREE_SEL_DATA = "TREE_SEL_DATA";
export const TREE_SEL_ALL = "TREE_SEL_ALL";
const permission = {
    state: {
        treeSelData: [],
    },
    actions: {
        reqLoading(context, params) {
            context.commit("REQUEST_LOADING", params);
        },
        // vue-selTree
        async getTreeSel ({commit}, id) {
            try {
                if (id) {
                    const data = await asyncResource({parentId: id});
                    commit(TREE_SEL_DATA, {data, id});
                } else {
                    const data = await asyncResource();
                    commit(TREE_SEL_DATA, {data});
                }
            } catch (err) {
                commit(REQUEST_LOADING, false);
            }
        }
    },
    mutations: {
        [REQUEST_LOADING]: (state, params) => {
            state.loading = params;
        },
        [TREE_SEL_DATA]: (state, payload) => {
            const {id, data} = payload;
            const resData = data.data;
            resData.map((it) => {
                if (it.childCount > 0) {
                    it.childrens = null;
                } else {
                    delete it.childrens;
                }
            });
            if (!id) {
                state.treeSelData = resData;
            } else {
                const setChild = (tree) => tree.map((it) => {
                    if (it.id === id) {
                        return {...it, childrens: resData};
                    } else if (it.childrens && it.childrens.length > 0) {
                        return {...it, childrens: setChild(it.childrens)};
                    } else {
                        return it;
                    }
                });
                state.treeSelData = setChild(state.treeSelData);
            }
        },
    }
};

export default permission;