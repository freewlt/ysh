export function formdata (data) {
    console.log('formdata', data);
    var formData = new FormData()
    Object.keys(data).forEach((key)=>{
        formData.append(key, data[key])
    })
    return formData
}
 