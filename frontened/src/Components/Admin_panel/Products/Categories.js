import React,{useEffect, useState} from 'react';
import "./Categories.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios"
import { categoriesActions } from '../../../Redux/MiddlewareActions.js'; 
import {imagessubmit,files} from "../../Cloudinary/Cloudinary.js"
import { API } from '../../../API/API.js';
import { useSelector,useDispatch } from 'react-redux';
//ABOVE OF ALL IMPORTS FROM DIFFERENT COMPONENTS


function Categories() {
  const [categoryname,setCategoryname] = useState(""); 
  const [description,setDescription] = useState("");
  const [categoryimage,setCategoryimage] = useState(null);
  const [imagetoggle,setImagetoggle] = useState(false) // OLD IMAGE DISPLAY OR NOT
  const [categoryid,setCategoryid] = useState(null) // ID OF THE PARTICULAR PRODUCT
  const [updatedcategorydata,setUpdatedcategorydata] = useState(false)
  const dispatch = useDispatch();
//ABOVE ALL ARE STATE MAINTAINED FOR DATA


  const categoriesdata = useSelector((state)=>state.CategoriesReducer.categories.category);
  // REDUX STATE FOR CATEGORY(ALL CATEGORIES DATA)

  useEffect( ()=>{
    const responsedata = async () =>{
await dispatch(categoriesActions())
    }
    responsedata();
   },[])
//USE-EFFECT FOR CALL THE REDUX CATEGORY DATA USING DISPATCH

  const handleFileChange = (e) => {
    setImagetoggle(false)
    const file = e.target.files[0];
    setCategoryimage(file);
  };

// ABOVE IS MAINTAIN AND STORE IMAGE DATA


const categorysubmit=async (e)=>{
  e.preventDefault();
  await imagessubmit(e,categoryimage)
 console.log("pavan kumar",files)
  setTimeout(async ()=>{
    console.log("categoriesdataimage890",categoryimage)
await axios.post(API+"add_category",{
  name:categoryname,
  description,
  Image:files[0]
}).then((res)=>{
  console.log(res);
 window.location.reload(); // this function is used for reload the page because the categoryimage not null
}).catch((error)=>console.log(error.message))
},2000);
console.log("categoriesdataimage8902345",categoryimage)
  }
// ABOVE IS POST AND STORE CATAGORY DATA IN DATABASE

const Editcategory=async (e,id)=>{
e.preventDefault();
setImagetoggle(true)
await axios.get(API+`category/${id}`).
// THIS API IS USED TO GET PARTICULAR CATEGORY
then((res)=>{
  console.log("response",res.data.particularcategory);
  setCategoryid(res.data.particularcategory[0]?._id);
  //ID OF THE PARTICULAR CATEGORY
   setCategoryname(res.data.particularcategory[0]?.name );
  setDescription(res.data.particularcategory[0]?.description);
  setCategoryimage(res.data.particularcategory[0]?.Image);
})
}
// ABOVE CODE IS USED FOR EDIT DATA STORED AND DISPLAY DATA IN INPUTS



const categoryupdate=async (e)=>{
  e.preventDefault();
  console.log(categoryid,categoryimage,files)
  if(imagetoggle == false){
    await imagessubmit(e,categoryimage)
  }
  // ABOVE CONDITION CHECK THE OLD IAMGE URL IS STORED OR NEW IMAGE WILL BE IN STORED IN CLOUDINARY
  // (FALSE MEANS NEW IMMAGE IS READY TO UPLOAD IN CLOUDINARY)
axios.patch(API+`update_category/${categoryid}`,{
  name:categoryname,
  description,
  Image:(files[0] ?files[0]:categoryimage), // IF NEW IMAGE IS UPLOAD IN CLOUDINARY IT WILL SEND TO DATABASE OTHERWISE OLD IMAGE WILL BE SEND
}).then((res)=>{
  console.log(res);
  window.location.reload();
}).catch((error)=>console.log(error.message))
}

// ABOVE CODE IS STORE UPDATED CATEGORY IN DATABASE



const deletecategory =(e,id)=>{
  e.preventDefault();
  axios.delete(API+`delete/${id}`).then((res)=>{window.location.reload();
    console.log(res)}).catch((error)=>console.log(error.message))
}



console.log("categoriesdataimage",categoryimage)
console.log("categoriesdata",categoriesdata)
  return (
    <div>
<h4 style={{fontWeight:"bold"}}>Categories</h4>
<div className='categories_form'>

  <form  style={{display:"flex",flexDirection:"column"}}>
<div>
        <label className='product_label'>Category Title</label><br />
        <input type='text' placeholder='type here' className='categories_input' value={categoryname} 
        onChange={(e)=>{console.log(e.target.value);setCategoryname(e.target.value)}}/>
        </div>

        <div>
        <label className='product_label'>Description</label><br />
        <textarea  placeholder='Product Description...' className='categories_input' rows={5} cols={40} value={description} 
        onChange={(e)=>setDescription(e.target.value)}/>
        </div>
       
        <div >
        <label className='product_label' >Images</label><br />
        <input type='file' style={{marginBottom:"20px",width:"100%"}}  onChange={handleFileChange} />
        </div>
    {(imagetoggle && categoryimage && categoryimage?.length >0) && <img src={categoryimage} alt="image" style={{width:"100px",height:"100px"}}/>}
        {/* <input type='submit' value={!imagetoggle ? 'submit':"update"}  style={{marginBottom:"20px",width:"100%"}}/> */}
       {(!imagetoggle && !categoryid ) ? <button style={{marginBottom:"20px",width:"100%"}} onClick={categorysubmit}>Submit</button>:
       <button style={{marginBottom:"20px",width:"100%"}} onClick={categoryupdate}>Update</button>} 
        </form>


<div>
        <table id="customers">
  <tr>
    <th>ID</th>
    <th>NAME</th>
    <th>IMAGE</th>
    <th>ACTIONS</th>
  </tr>

    {categoriesdata ? categoriesdata?.map((data,index)=>{
      return(
        <tr key={data._id}>
 <td>{index}</td>
    <td>{data?.name}</td>
    <td><img src={data?.Image} alt="image" style={{width:"50px",height:"50px"}}/></td>
    <td >
      <div style={{display:"flex",justifyContent:"space-around",fontSize:"20px"}}>
      <FaEdit onClick={(e)=>Editcategory(e,data._id)}/><RiDeleteBin6Line onClick={(e)=>deletecategory(e,data._id)}/>
      </div>
      </td>
</tr>
)}):""}
   
 
</table>
        </div>
</div>
   </div>
  )
}

export default Categories
