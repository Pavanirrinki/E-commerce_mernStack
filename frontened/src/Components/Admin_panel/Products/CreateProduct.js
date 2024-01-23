import React,{ useEffect} from 'react'
import Travel from "../../../Images/aeroplane.jpg"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ProductsActions } from '../../../Redux/MiddlewareActions';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../API/API';
function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsdata = useSelector((state)=>state.ProductsReducer.products.product)
  useEffect( ()=>{
    const productsdata = async () =>{
await dispatch(ProductsActions())
    }
    productsdata();
   },[])

   const deleteproduct =(e,id)=>{
    e.preventDefault();
    axios.delete(API+`delete_product/${id}`).then((res)=>{window.location.reload();
      console.log(res)}).catch((error)=>console.log(error.message))
  }






   console.log("productsdata",productsdata)
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ fontWeight: "bold" }}>Products</h4>
          <button style={{
            border: "none", backgroundColor: "green", color: "white", fontWeight: "bolder",
            padding: "0px 5px 0px 5px", borderRadius: "10px", marginRight: "50px"
          }}>Create New</button>
        </div>
      
        <div style={{ border: "1px solid black", backgroundColor: "white", display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "20px" }}>
        {productsdata && productsdata.map((data)=>
      {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "250px", border: "1px solid black", margin: "10px" }}>
      
              <img src={data.images[0]} style={{ height: "200px", width: "200px" }} />
              <p style={{marginBottom:"0px"}}>{data.name}</p>
             <span style={{fontWeight:"bold"}}>${data.price}</span>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                <FaEdit style={{ fontSize: "20px", border: "3px solid green", width: "60px", height: "30px" }} 
                onClick={()=>navigate(`/admin_panel/Edit_product/${data._id}`)}/>
                <MdDelete style={{ fontSize: "20px", border: "3px solid red", width: "60px", height: "30px" }} 
                onClick={(e)=>deleteproduct(e,data._id)}/>
              </div>
               
            </div>

)})}
          </div>
  
    </div>
  )
}

export default CreateProduct
