import React,{useState,useEffect} from 'react'
import { FaTags } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import Rating from '../Rating&Reviews/Rating';
import axios from "axios";
import { API } from '../../API/API';
import Comments from '../Comments/Comments.js';
import { useParams } from 'react-router-dom';
import "./Singleproduct.css"
import { loggeduserAction }  from "../../Redux/MiddlewareActions.js";
import { useSelector,useDispatch } from 'react-redux';
 function Singleproduct() {
  const {id} = useParams();
  const dispatch = useDispatch()
  console.log("id",id)
  const [particularproductdata,setParticularproductdata] = useState(null);
  const [imageId,setImageId] = useState(null)
  const userdetails = JSON.parse(localStorage.getItem("userdata"));
  const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details))
  useEffect(() => {
    if (userdetails) {
      dispatch(loggeduserAction(userdetails?.user?._id))
    }
  }, [])

useEffect(()=>{
axios.get(API+`product/${id}`).
then((res)=>setParticularproductdata(res.data)).catch((error)=>console.log(error.message))
},[])



const imageschange=(idx)=>{
 setImageId(idx)
}
const Item_Added_to_cart =(e,product_id) =>{
  e.preventDefault();
console.log("product_id",product_id);
   axios.post(API+"item_add_to_cart",{
    user_id:userdetails?.user,
    product_id,
   },{
    headers: {
      'Content-Type': 'application/json', 
      'X-Token': userdetails?.token
    }
  }).then((data)=>localStorage.setItem("cartdata",JSON.stringify(data.data))).catch((error)=>console.log(error.message));
}

const productpresentornotincart =  userstate?.cartproducts?.findIndex((product)=>product?.product?._id?.toString() == id)

console.log(productpresentornotincart,"productpresentornotincart")

console.log(particularproductdata,'particular')
console.log("ni yebba edhi redux ra",userstate)
  return (
    <><div className='single_product_container'>
      <div>
        <div style={{display:'flex'}} >
       <div  className='mobile_version_images'>
       {particularproductdata && particularproductdata?.particularproduct?.images?.map((data, idx) => {
    return (
        <img
            key={idx} 
            src={data}
            style={{ height: '100px', width: "100px", margin: "0px 0px 10px 10px" }}
            onMouseOver={() => imageschange(idx)} 
        />
    );
})}

       </div>
        <img src={!imageId ?particularproductdata?.particularproduct?.images[0]: particularproductdata?.particularproduct.images[imageId]} 
        style={{ height: '400px', width: "400px", border: '1px solid black', margin: "0px 70px 10px 10px" }} />
        </div>
        <div  className='d-md-none'>
       {particularproductdata && particularproductdata?.particularproduct?.images?.map((data, idx) => {
    return (
        <img
            key={idx} 
            src={data}
            style={{ height: '100px', width: "80px", margin: "0px 0px 10px 10px" }}
            onMouseOver={() => imageschange(idx)} 
        />
    );
})}

       </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

        {productpresentornotincart == -1  ? 
         <button style={{ border: "none", backgroundColor: "#ff9f00", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}  
          onClick={(e)=>Item_Added_to_cart(e,particularproductdata?.particularproduct?._id)}>
            <FaShoppingCart style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />ADD TO CART</button> :
             <button style={{ border: "none", backgroundColor: "#ff9f00", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}   >
            <FaShoppingCart style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />GO TO CART</button>  }
          
          <button style={{ border: "none", marginLeft: "30px", backgroundColor: "#f08b07", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}>
            <AiFillThunderbolt style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />BUY NOW</button>
        </div>
      </div>

      <div className='text_align_mobile'>
        <p>{particularproductdata?.particularproduct?.description}</p>
        <span style={{ float: "left", color: "white", backgroundColor: "green", padding: "2px", marginRight: "10px", borderRadius: "10px" }}>{particularproductdata?.rating} rating</span>
        <p>1,249 Ratings & 108 Reviews</p>
        <h6>Special Price</h6>
        <div style={{ display: "flex" }}>
          <h4 style={{ float: "left", marginRight: "10px" }}>₹ {particularproductdata?.price}</h4>
          <h6 style={{ textDecoration: "line-through", color: "grey", marginTop: "5px" }}>₹ 50,000</h6>
          <h6 style={{ color: "#228c22", marginTop: "5px", fontWeight: "bold", marginLeft: "10px" }}>33% off</h6>
        </div>
        <div>
          <h6>Available Offers</h6>
          <div>
            <FaTags />
            <span style={{ marginLeft: "20px" }}>kkkkkkkkkkkk</span>
          </div>
          <div>
            <FaTags />
            <span style={{ marginLeft: "20px" }}>kkkkkkkkkkkk</span>
          </div>
        </div>
        <div>
          <h6 style={{ marginTop: "30px" }}>Product Description</h6>
          <ul>
            <li>ppppppp</li>
            <li>AAAAAAA</li>
            <li>VVVVVVV</li>
            <li>AAAAAAA</li>
            <li>NNNNNNN</li>
            <li>KKKKKKKK</li>
          </ul>
        </div>

      </div>
    </div>
    <div className='d-md-flex'>
    <Rating Rating={particularproductdata?.particularproduct?.rating}/>
    <div style={{}} className='width_comments'>
    <Comments comments={particularproductdata?.particularproduct?.comments} rating={particularproductdata?.particularproduct?.rating}/>
    </div>
    </div>
    </>  
  )
}

export default Singleproduct;
