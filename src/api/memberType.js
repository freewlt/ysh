/**
 * 会员类型
 *
 * Created by LiChao on 2020/7/6.
 */
import {get, post} from "../utils/http";

//分页列表查询
export function list(params = {}, config = {contentLoading: true}) {
    return get("/api-base/membertype/list", params, config);
}

//新建保存
export function save(data) {
    return post("/api-base/membertype/save", data);
}

//获取单条数据
export function getOne(id, config = {contentLoading: true}) {
    return get("/api-base/membertype/get/" + id, {}, config);
}

//编辑更新
export function update(data) {
    return post("/api-base/membertype/update", data);
}

//删除
export function deleteOne(id, config = {contentLoading: true}) {
    return get("/api-base/membertype/delete/" + id, {}, config);
}