export function formdata (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key)=>{
        if(data[key]){
            formData.append(key, data[key])
        }
    })
    return formData
}
 