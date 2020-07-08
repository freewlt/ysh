<template>
    <div class="uploadCon">
        <el-upload
                :action="action"
                :multiple="multiple"
                name="file"
                :show-file-list="showFileList"
                :drag="drag"
                :accept="accept"
                :on-preview="onPreview"
                :on-remove="onRemove"
                :on-success="onSuccess"
                :on-error="onError"
                :before-upload="beforeUpload"
                @abort="abort"
                >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "uploadCon",
    props: {
        action: {
            type: String,
            default: ""
        },
        multiple: {
            type: Boolean,
            default: false
        },
        showFileList: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        accept: {
            type: String,
            default: ""
        },
        onPreview: {
            type: Function,
            default: function(){}
        },
        onRemove: {
            type: Function,
            default: function(){}
        },
    },
    data() {
        return {
            imageUrl: ""
        };
    },
    methods: {
        onError(err, file, fileList) {
            console.log(err, file, fileList);
            this.$emit("onError",err);
        },
        onSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res,file);
        },
        beforeUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //    this.$message.error("上传头像图片只能是 JPG 格式!");
            //}
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }

            return isLt2M;
        },
        abort(file){
            this.$emit("abort",file);
        },
    }
};
</script>

<style lang="less" scoped>
    .uploadCon {
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            border:1px dashed #ccc;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
    }
</style>
