import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../API/API'
import "./Orders.css"
function Orders() {
const [ordersdata,setOrdersdata] = useState(null)
    useEffect(()=>{
axios.get(API+"admin_dashboard/allorders").then((res)=>setOrdersdata(res.data)).catch((error)=>console.log(error.message))
    },[])

    console.log("ordersdata",ordersdata)
  return (
    <div>
    <table style={{width:"100%"}}>
    <thead>
        <tr>
            <th>product Name</th>
            <th>Delivery Address</th>
            <th>Payment Id</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    {ordersdata?.allorders?.map((product)=>{
        return(
            <><tr>
                <td>{product?.products?.name}</td>
                <td>
                    <p>Name :- 123445</p>
                    <p>Mobile :- 123445</p>
                    <p style={{ wordBreak: "break-all", width: "180px" }}>Address :- {product?.deliveredto?.State},{product?.deliveredto?.city},
                        {product?.deliveredto?.Area},{product?.deliveredto?.Landmark},{product?.deliveredto?.Locality},
                        {product?.deliveredto?.zipcode}</p>

                </td>
                <td>{product?.paymentdetails}</td>
                <td>{product?.productcount}</td>
                <td>{product?.timestamp.split("T")[0]}</td>
                <td><button style={{backgroundColor:"green",color:"white",
                padding:"2px 8px",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Delivered</button></td>
          
            </tr>
            <td colSpan="6">
            <hr style={{ borderRadius: "10px", borderStyle: "solid", width: "100%" }} />
          </td></>
        )
    })}
        
       
    </tbody>
</table>
    </div>
  )
}

export default Orders
