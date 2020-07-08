/**
 * Created by Administrator on 2020/6/20.
 */
import { get, post } from "../utils/http";

export function fetchResource(params = {}, config = {contentLoading: true}) {
    return get("/api-base/resource/tree", params, config);
}

export function saveResource(data) {
    return post("/api-base/resource/save", data);
}

export function getResource(id, config = {contentLoading: true}) {
    return get("/api-base/resource/get/" + id, {}, config);
}

export function updateResource(data) {
    return post("/api-base/resource/update", data);
}

export function deleteResource(id, config = {contentLoading: true}) {
    return get("/api-base/resource/delete/" + id, {}, config);
}

export function asyncResource(params = {}, config = {contentLoading: true}) {
    return get("/api-base/resource/async-tree", params, config);
}