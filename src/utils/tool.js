import store from '@/utils/store'

export function formdata (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key)=>{
        if(data[key]){
            formData.append(key, data[key])
        }
    })
    return formData
}

// vue-TreeSelect箭头是否保留
export function treeSelectChild (params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i].childCount>0){
            params[i].childrens = null;
        }else{
            delete params[i].childrens;
        }
    }
}

// vue-TreeSelect 懒加载 childrens 数据
export function treeSelectLoad ({ parentNode, callback }, url ,params){
    url(params).then((res) => {
        let childrenArray = [];
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].childCount > 0){
                res.data[i].childrens = null;
            } else {
                delete res.data[i].childrens;
            }
            childrenArray.push(res.data[i])
        }
        parentNode.childrens = childrenArray;
        callback()
    })
}

//
export function isShowLoading (isShow) {
    if (isShow) {
        store.commit('isShow', true);
    } else {
        store.commit('isShow', false);
    }
}