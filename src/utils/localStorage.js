/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) {return;}
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};
/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) {
        return null;
    }
    return window.localStorage.getItem(name);
};
/**
 * 删除localStorage
 */
export const removeStore = name => {
    if(!name) {
        return false;
    }
    window.localStorage.removeItem(name);
};

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
    let list = [];
    let {
        type
    } = params;
    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: "session"
                })
            });
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i)
                })
            });
        }
    }
    return list;
};

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
    let { type } = params;
    if (type) {
        window.sessionStorage.clear();
    } else {
        window.localStorage.clear();
    }
};
