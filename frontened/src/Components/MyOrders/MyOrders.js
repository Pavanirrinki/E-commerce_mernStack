import React, { useEffect } from 'react';
import "./MyOrders.css";
import { useDispatch,useSelector } from 'react-redux';
import { loggeduserAction } from '../../Redux/MiddlewareActions';
import { useNavigate } from 'react-router-dom';
function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userdetails = JSON.parse(localStorage.getItem("userdata"));
  const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details))
  useEffect(() => {
    if (userdetails) {
      console.log("user",userdetails)
      dispatch(loggeduserAction(userdetails?.user?._id))
    }
  }, [])
  console.log(userstate,'pdft')
  return (
<div className='my_cart'>
  <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
  <input type="search" className='search_bar'/>
  <button className='search_button'>Search</button>
  </div>
  {userdetails && userstate?.purchasedproducts?.length !== 0 ? userstate?.purchasedproducts?.map((product)=>{
    return(
      <div className='my_order_block' onClick={()=>navigate(`/product/${product?._id}`)}>
      <img src={product?.images[0]} className="orders_image"/>
      <div style={{margin:"auto"}}>
      <p>{product?.name}</p>
      <p>color:Sun flower</p>
      </div>
      <div style={{margin:"auto"}}>
      <p>${product?.price}</p>
      </div>
      <div style={{margin:"auto"}}>
      <p >Delivered on Mar29</p>
      <p>Your item has been delivered</p>
      </div>
    </div>
    )
  }):<h1 style={{textAlign:"center",fontWeight:"bold"}}>No orders</h1>}
     
     
    </div>
  )
}

export default MyOrders
