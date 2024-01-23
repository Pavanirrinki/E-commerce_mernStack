import React,{useEffect, useState} from 'react';
import "./CreateNewproduct.css";
import { useSelector,useDispatch } from 'react-redux';
import {categoriesActions} from '../../../Redux/MiddlewareActions.js'
import { imagessubmit,files } from '../../Cloudinary/Cloudinary';
import axios from 'axios';
import { API } from '../../../API/API.js';
import {  toast } from 'react-toastify';
import { TiDelete } from "react-icons/ti";
import { useParams,useNavigate } from 'react-router-dom';
function EditProduct() {
  const [producttile,setProducttitle] = useState('');
  const [productprice,setProductprice] = useState(0);
  const [productdescription,setProductdescription] = useState('');
  const [productscount,setProductscount] = useState(0);
  const [productcategory,setProductcategory] = useState(null);
  const [productimage,setProductimage] = useState(null);
  const [images123,setImages] = useState(true)
  const categoriesdata = useSelector((state)=>state.CategoriesReducer.categories.category);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()

  useEffect( ()=>{
    const fetchdata =async () =>{
    await dispatch(categoriesActions());
    }
    fetchdata()
  },[])
  useEffect( ()=>{
    const responsedata = async () =>{

 await axios.get(API+`product/${params.id}`).then(async (res)=>{
const pastproductcategory = await categoriesdata?.filter((response)=>response._id == res.data.category)
console.log('pastproductcategor',pastproductcategory[0]?.name)
  console.log(res.data)
  setProductprice(res.data.price);
  setProductdescription(res.data.description);
  setProductscount(res.data.countInstock);
  setProductimage(res.data.images);
  setProducttitle(res.data.name);
  // setProductcategory(pastproductcategory[0])
  setProductimage(res.data.images)
}).catch((error)=>console.log(error.message))
console.log("pppppppppppppppppppppp",productcategory)
console.log("pp",productimage)
}
    responsedata();
   },[dispatch,categoriesdata,params.id])
   const handleCategoryChange = (event) => {
    setProductcategory(event.target.value);
  };
  const handleFileChange = (e) => {
   setImages(false);
  setProductimage(null)
    const file = e.target.files;
      setProductimage(file);
  
  };
console.log("productimge 1234678",productimage)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(images123 == false){
      console.log("falsefalsefalsefalsefalse")
    await imagessubmit(event,productimage);
    }
 console.log("pppppppppppppooooooll",productimage,files)
 await axios.patch(API+`update_product/${params.id}`,
 {name:producttile,
  price:productprice,
  countInstock:productscount,
  description:productdescription,
  category:productcategory,
  images: (files.length > 0) ? files : productimage}).then((res)=> console.log(res.data) ).
  catch((error)=>console.log(error.message))
 
};


console.log("pokemonbkdkflflff",files,productimage)

  return (
    <div>
       <div style={{display:"flex",justifyContent:"space-between"}}>
       <button style={{border:"none",backgroundColor:"red",color:"white",fontWeight:"bolder",
       padding:"0px 5px 0px 5px",borderRadius:"10px",marginRight:"50px"}}>Go to products</button>
       <h4 style={{fontWeight:"bold"}}>Edit Products</h4>
       <button style={{border:"none",backgroundColor:"green",color:"white",fontWeight:"bolder",
       padding:"0px 5px 0px 5px",borderRadius:"10px",marginRight:"50px"}} onClick={handleSubmit}>Update Now</button>
       </div>
       <div className='create_product_form'>
       <form >
        <div>
        <label className='product_label'>Product title</label><br />
        <input type='text' placeholder='Product Name...' className='input_field' 
        value={producttile} onChange={(e)=>setProducttitle(e.target.value)}/>
        </div>
        <div>
        <label className='product_label'>Price</label><br />
        <input type='number' placeholder='Product Price...' className='input_field' 
        value={productprice} onChange={(e)=>setProductprice(e.target.value)}/>
        </div>
        <div>
        <label className='product_label'>Count In Stock</label><br />
        <input type='number' placeholder='Product Stock...' className='input_field' 
        value={productscount} onChange={(e)=>setProductscount(e.target.value)}/>
        </div>
        <div>
        <label className='product_label'>Description</label><br />
        <textarea  placeholder='Product Description...' className='input_field' rows={5} cols={100} 
        value={productdescription} onChange={(e)=>setProductdescription(e.target.value)}/>
        </div>
        <div>
        <label className='product_label' for='categories-names'>category</label><br />
        <select name="categories-names" id="categories-names" className='input_field'  value={productcategory}
        onChange={handleCategoryChange}>
             <option value="" disabled>Select a category</option>
      {categoriesdata && categoriesdata.map((data)=>{
return ( 

<option value={data._id}>{data.name}</option>
)
      })}
      </select>
        </div>
        <div style={{marginBottom:"20px"}}>
        <label className='product_label'>Images</label><br />
    <input type='file' style={{width:"100%"}} multiple onChange={handleFileChange} />   
  {!images123 &&
        <p style={{color:"red",fontSize:"12px",fontWeight:"bold"}}>(please replace with all new images)</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "center",flexWrap:"wrap"}}>
        {images123 && productimage && productimage.length > 0 ? (
  productimage.map((data, index) => (
    <div key={index} style={{ position: 'relative', marginRight: '20px' }}>
      <img src={data} style={{ height: "200px", width: "200px", marginBottom: "20px" }} alt={`Product ${index + 1}`} />
      <div style={{ position: 'absolute', top: "-25px", right: "-12px", fontSize: "30px", cursor: 'pointer' }}>
        <TiDelete />
      </div>
    </div>
  ))
) : (
 ''
)}


</div>
       </form>
       </div>
    </div>
  )
}

export default EditProduct;
