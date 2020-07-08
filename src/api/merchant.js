import {get, post} from "../utils/http";

export function list(params, config = {contentLoading: true}) {
    return get("/api-base/merchant/list", params, config);
}

export function getAllCompanyOrStation(parentID, config = {contentLoading: true}) {
    return get("/api-base/organizational/list-all-organizational", {"parentId": parentID}, config);
}

export function saveMerchant(data) {
    return post("/api-base/merchant/save", data);
}

export function delMerchant(id, config = {contentLoading: true}) {
    return get("/api-base/merchant/delete/" + id, {}, config);
}

export function getMerchant(id, config = {contentLoading: true}) {
    return get("/api-base/merchant/get/" + id, {}, config);
}

export function updateMerchant(data, config = {contentLoading: true}) {
    return post("/api-base/merchant/update", data, config);
}