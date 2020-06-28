// import store from '@/utils/store'
import {Message, MessageBox} from "element-ui";

export function formdata(data) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        if (data[key]) {
            formData.append(key, data[key]);
        }
    });
    return formData;
}

export function deleteList(url, id) {
    MessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        url(id).then(() => {
            Message({
                type: "success",
                message: "删除成功!"
            });
        });
    }).catch(() => {
        Message({
            type: "info",
            message: "已取消删除"
        });
    });
}