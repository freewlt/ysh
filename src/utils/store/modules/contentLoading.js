// api

// types
export const LOADING = "LOADING";

const resource = {
    state: {
        loading: false
    },
    actions: {
        contentLoading(context, params) {
            context.commit("LOADING", params);
        },
    },
    mutations: {
        [LOADING]: (state, params) => {
            state.loading = params;
        }
    }
};

export default resource;