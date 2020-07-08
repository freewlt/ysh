import { get, post } from "../utils/http";

export function asyncArea(params = {}, config = {contentLoading: true}) {
    return get("/api-base/area/async-tree", params, config);
}

export function getArea(id, config = {contentLoading: true}) {
    return get("/api-base/area/get/" + id, {}, config);
}

export function saveArea(data) {
    return post("/api-base/area/save", data);
}

export function updateArea(data) {
    return post("/api-base/area/update", data);
}

export function deleteArea(id, config = {contentLoading: true}) {
    return get("/api-base/area/delete/" + id, {}, config);
}




