import axios from "axios"
import { useEffect } from "react";
export const files =[]


export const imagessubmit=async (e,image)=>{
    e.preventDefault();
    const formdata =new FormData();
    if(image.length > 1){
    for (let i = 0; i < image.length; i++) {
    formdata.append("file",image[i]);
    formdata.append("upload_preset",'xenymzuf');
   await axios.post("https://api.cloudinary.com/v1_1/dvbvggl5f/image/upload",formdata).
    then((res)=>{
        files.push(res.data.url);
    console.log(res.data.url,'res.data.url')}).catch((error)=>console.log(error))
    }
}else{
    formdata.append("file",image);
    formdata.append("upload_preset",'xenymzuf');
   await axios.post("https://api.cloudinary.com/v1_1/dvbvggl5f/image/upload",formdata).
    then((res)=>{
        files.push(res.data.url);
    console.log(res.data.url,'res.data.url')}).catch((error)=>console.log(error))
}
    return files;
}
 