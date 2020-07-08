/**
 * 编码管理 Api url
 *
 * Created by gff on 2020/7/2.
 */
import {get, post} from "../utils/http";

export function list(params = {}, config = {contentLoading: true}) {
    return get("/api-base/stdcode/list", params, config);
}

export function saveStdcode(data) {
    return post("/api-base/stdcode/save", data);
}

export function updateStdcode(data) {
    return post("/api-base/stdcode/update", data);
}

export function getStdcode(id, config = {contentLoading: true}) {
    return get("/api-base/stdcode/get/" + id, {}, config);
}

export function deleteStdcode(id, config = {contentLoading: true}) {
    return get("/api-base/stdcode/delete/" + id, {}, config);
}

// 根据所传编码类型 获取编码
export function stdCodes(stdCodeTypes = {}, flag) {
    let array = [];
    for (let item in stdCodeTypes) {
        array.push(stdCodeTypes[item].name);
    }

    let url = "";
    if (flag) {
        // 可用编码接口地址
        url = "/api-base/stdcode/enablecodes";
    } else {
        // 全部编码接口地址
        url = "/api-base/stdcode/codes";
    }

    post(url, array, {
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => {
        for (let item in stdCodeTypes) {
            stdCodeTypes[item].items = res.data.data[stdCodeTypes[item].name];
        }
    });
}





