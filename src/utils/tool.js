import { Message, MessageBox } from "element-ui";

export function formdata(data) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        if (data[key]) {
            formData.append(key, data[key]);
        }
    });
    return formData;
}

export function deleteRow(message, url, id, callback) {
    MessageBox.confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        url(id).then(response => {
            Message({
                type: "success",
                message: response.data.message || "操作成功！"
            });
            callback(response);
        });
    });
}