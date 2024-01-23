import React, { useEffect, useState } from 'react'
import Travel from "../../Images/aeroplane.jpg"
import { Link } from 'react-router-dom';
import "./Cart.css"
import "../MyOrders/MyOrders.css";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { loggeduserAction } from '../../Redux/MiddlewareActions';
import { API } from '../../API/API';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("userdata"));
  const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details))
  useEffect(() => {
    if (userdetails) {
      dispatch(loggeduserAction(userdetails?.user?._id))
    }
  }, [])


  const IncreaseCartProduct = (e, product_id) => {
    e.preventDefault()
    axios.post(API + "item_add_to_cart", { user_id: userdetails?.user?._id, product_id }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': userdetails?.token
      }
    }).
      then((res) => {
        console.log("ttttttttttttttttttttt", res.data);
        dispatch(loggeduserAction(userdetails?.user?._id))
      }).
      catch((error) => console.log({ error: error.message }))
  }


  const DecreaseCartProduct = (e, product_id) => {
    e.preventDefault()
    axios.post(API + "item_remove_to_cart", { user_id: userdetails?.user?._id, product_id, data: "DECREMENT" }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': userdetails?.token
      }
    }).
      then((res) => {
        console.log("ttttttttttttttttttttt", res.data);
        dispatch(loggeduserAction(userdetails?.user?._id))
      }).
      catch((error) => console.log({ error: error.message }))
  }

  const RemoveCartProduct = (e, product_id) => {
    e.preventDefault()
    axios.post(API + "item_remove_to_cart", { user_id: userdetails?.user?._id, product_id, data: "REMOVE" }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': userdetails?.token
      }
    }).
      then((res) => {
        console.log("ttttttttttttttttttttt", res.data);
        dispatch(loggeduserAction(userdetails?.user?._id))
      }).
      catch((error) => console.log({ error: error.message }))
  }

  console.log(userstate, "userstate")
  return (

    // DESKTOP VERSION
    <div>
     {userstate?.cartproducts?.length > 0 ? <div className='cart_container'>
        <div className='desk_version'>
          <div className='my_cart_container'>
            {userstate && userstate?.cartproducts?.map((products) => (
              <div className='my_cart_block'>
                <img src={products?.product?.images[0]} style={{ width: "140px", height: "200px", padding: "20px" }} />

                <div style={{ margin: "auto" }}>
                  <p>{products?.product?.name}</p>
                  <p>6 GB RAM</p>
                  <p>$ {products?.product?.price}</p>
                  <p>6 GB RAM</p>
                  <div className='quantityandremoveproduct'>
                    <CiCircleMinus style={{ fontSize: "30px", fontWeight: 'bolder' }} onClick={(e) => DecreaseCartProduct(e, products?.product._id)} />
                    <p style={{ width: "60px", textAlign: "center", border: "1px solid black", margin: "2px 10px 2px 10px" }}>{products?.Count}</p>
                    <CiCirclePlus style={{ fontSize: "30px", fontWeight: 'bolder' }} onClick={(e) => IncreaseCartProduct(e, products?.product._id)} />
                    <h5 style={{ margin: "0px 30px 0px 30px" }}>Save For Later</h5>
                    <h5 onClick={(e) => RemoveCartProduct(e, products?.product._id)}>Remove</h5>
                  </div>
                </div>
                <div style={{ margin: "auto" }}>
                  <p >Delivered on Mar29</p>
                  <p>Your item has been delivered</p>
                </div>
              </div>
            ))}

          </div>

        </div>

        {userstate && <div className='my_pricedetails_block desk_version class_height' style={{ marginRight: "30px" }}>
          <h4 style={{ textAlign: "center" }}>PRICE DETAILS</h4>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <p >price</p>
            <p >$ {userstate?.cartprice}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <p >Dicount</p>
            <p >deddd</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <p >Delivery Charges</p>
            <p >deddd</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <p >Secured Packaging Fee</p>
            <p >deddd</p>
          </div>
          <hr style={{ border: "1px solid black" }} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <h5>Total Amount</h5>
            <h5>$ {userstate?.cartprice}</h5>
          </div>
          <hr style={{ border: "1px solid black", marginBottom: "2px" }} />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button style={{
              backgroundColor: "#fb641b", padding: "10px 30px",
              border: "none", borderRadius: "5px", fontWeight: "900", color: "white"
            }} onClick={() => navigate("/place_order")}>Place Order</button>
          </div>
        </div>}





        {/* MOBILE VERSION */}

        <div className='my_cart_container mobile_version'>
          {userstate && userstate?.cartproducts?.map((products) => (
            <div className='my_cart_block'>
              <div className='cart_container'>
                <img src={products?.product?.images[0]} style={{ width: "140px", height: "200px", padding: "20px" }} />

                <div style={{ margin: "auto" }}>
                  <p>{products?.product?.name}</p>
                  <p>6 GB RAM</p>
                  <p>$ {products?.product?.price}</p>
                  <p>6 GB RAM</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#d3d7de", paddingTop: "10px" }}>
                <div style={{ display: "flex" }}>
                  <CiCircleMinus style={{ fontSize: "25px", fontWeight: 'bolder', margin: "0px" }} onClick={(e) => DecreaseCartProduct(e, products?.product._id)} />
                  <p style={{ width: "60px", textAlign: "center", border: "1px solid black", margin: "2px 10px 2px 10px" }}>{products?.Count}</p>
                  <CiCirclePlus style={{ fontSize: "25px", fontWeight: '900' }} onClick={(e) => IncreaseCartProduct(e, products?.product._id)} />
                </div>
                <h6 style={{ fontWeight: "900", color: "green" }}>Buy Now</h6>
                <h6 style={{ fontWeight: "bold", color: "red" }} onClick={(e) => RemoveCartProduct(e, products?.product._id)}>Remove</h6>
              </div>

            </div>
          ))}



        </div>



      </div>:
      <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
      <h6 style={{fontWeight:"bold"}}>No cart items</h6>
      <Link to='/'><h6 style={{fontWeight:"bold"}}>BACK TO SHOP</h6></Link>
      </div>}


     {userstate?.cartproducts?.length > 0 &&<div className='mobile_version_card'>
        <h5 style={{ fontWeight: "900" }}>$ {userstate?.cartprice}</h5>
        <button style={{ backgroundColor: "#fb641b", padding: "10px 30px", border: "none", borderRadius: "5px", fontWeight: "900", color: "white" }}>Place Order</button>
      </div>}
    </div>
  )
}

export default Cart
