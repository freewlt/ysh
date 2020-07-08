/**
 * 编码分类管理 Api url
 *
 * Created by gff on 2020/7/2.
 */
import {get, post} from "../utils/http";

export function list(params = {}, config = {contentLoading: true}) {
    return get("/api-base/stdcode-type/list", params, config);
}

export function saveStdcodeType(data) {
    return post("/api-base/stdcode-type/save", data);
}

export function updateStdcodeType(data) {
    return post("/api-base/stdcode-type/update", data);
}

export function getStdcodeType(id, config = {contentLoading: true}) {
    return get("/api-base/stdcode-type/get/" + id, {}, config);
}

export function deleteStdcodeType(id, config = {contentLoading: true}) {
    return get("/api-base/stdcode-type/delete/" + id, {}, config);
}





