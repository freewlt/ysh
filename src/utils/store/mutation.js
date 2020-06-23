/**
 * Created by Administrator on 2020/6/23.
 */
const mutations = {
    // loading是否显示
    isShow: (state, data) => {
        state.isShow = data;
    },
    // formResource更新
    formResource: (state, data) => {
        state.formResource = data;
    },
    formResourceId: (state, data) => {
        state.formResource.id = data;
    },
    formResourceParentId: (state, data) => {
        state.formResource.parentId = data;
    },
    formResourceUrl: (state, data) => {
        state.formResource.url = data;
    },
}
export default mutations