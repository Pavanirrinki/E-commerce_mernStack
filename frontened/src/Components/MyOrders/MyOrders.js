import React from 'react';
import "./MyOrders.css";
import Travel from "../../Images/aeroplane.jpg";

function MyOrders() {
  return (
<div className='my_cart'>
  <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
  <input type="search" className='search_bar'/>
  <button className='search_button'>Search</button>
  </div>
      <div className='my_order_block'>
        <img src={Travel} style={{ width: "140px", height: "200px", padding: "20px" }} />
        <div style={{margin:"auto"}}>
        <p>realme c55</p>
        <p>color:Sun flower</p>
        </div>
        <div style={{margin:"auto"}}>
        <p>11,048</p>
        </div>
        <div style={{margin:"auto"}}>
        <p >Delivered on Mar29</p>
        <p>Your item has been delivered</p>
        </div>
      </div>
      <div className='my_order_block'>
        <img src={Travel} style={{ width: "140px", height: "200px", padding: "20px" }} />
      </div>
    </div>
  )
}

export default MyOrders
