import React, { useEffect, useState } from 'react'
import "./ManageAddress.css"
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import {API} from "../../API/API.js";
import { useSelector,useDispatch } from 'react-redux';
import { loggeduserAction } from '../../Redux/MiddlewareActions.js';
function ManageAddress() {
  const dispatch = useDispatch();
  const initialAddress = {
    name: "",
    mobileNumber: "",
    zipcode: "",
    Area: "",
    city: "",
    Landmark: '',
    alternativephone: "",
    Address_type: "",
    Locality: "",
    State: ""
  };
  const [user_address,setUser_address] =useState(initialAddress);
  const [show_address,setShow_address] = useState(false);
  const [show_user_data,setShow_user_data] = useState(false);
   const userdetails = JSON.parse(localStorage.getItem("userdata"));
   const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details))
   useEffect(() => {
     if (userdetails) {
       dispatch(loggeduserAction(userdetails?.user?._id))
     }
   }, [show_user_data])
const addresschange =(e) =>{
  const { name, value } = e.target;
  setUser_address((prevAddress) => ({
    ...prevAddress,
    [name]: value
  }));
}
console.log("user_details_data",userstate)
const showaddress_input =(e) =>{
  e.preventDefault();
  setShow_address((prev)=>!prev);
}
const ManageAddress =(e) =>{
  e.preventDefault()
  console.log("adresssssss",user_address)
 axios.post(API+`manage_addresses/${userdetails?.user?._id}`,user_address).
 then((res)=>{console.log(res.data);setUser_address(initialAddress);setShow_user_data(true)}).catch((error)=>console.log(error.message))
}
  return (
    <div>
      <h4 style={{fontWeight:"900"}}>Manage Address</h4>
     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto",
     color:"blue",border:"1px solid black",marginBottom:"20px",width:"90%"}} onClick={showaddress_input}>
  <FaPlus />
  <p style={{ fontSize: "20px", marginLeft: "8px", marginBottom: "0" }}>Add Address</p>
</div>

<form style={{flexWrap:"wrap",justifyContent:"center",paddingTop:"40px",width:"80%",margin:"0 auto",marginBottom:"20px"}} 
className={show_address ? 'd-md-flex d-block box_address':"disply_address"} onSubmit={ManageAddress}>
  <input type="name" placeholder='Enter your name...' className='input_field' name="name" onChange={addresschange} value={user_address?.name}/><br />
 <input type="tel" placeholder="Enter your mobile number..." className='input_field' name="mobileNumber" onChange={addresschange} value={user_address?.mobileNumber}/><br />
 
<input type="number" placeholder='Enter your zipcode...'  className='input_field'name="zipcode" onChange={addresschange} value={user_address?.zipcode}/><br />
<input type="text" placeholder='Enter your Locality...'  className='input_field' name='Locality' onChange={addresschange} value={user_address?.Locality}/><br />
<textarea placeholder='Address(Area and Street)' rows={7} cols={50} className='input_textarea_field'name="Area"onChange={addresschange} value={user_address?.Area}/><br />
<input type="text" placeholder='City/District/Town' className='input_field' name="city"onChange={addresschange} value={user_address?.city}/><br />
<input type="text" placeholder='Landmark' className='input_field' name="Landmark"onChange={addresschange} value={user_address?.Landmark}/><br />
<input type="tel" placeholder='AlternativePhoneNumber......' className='input_field' name="alternativephone"onChange={addresschange} value={user_address?.alternativephone}/><br />
<input type="tel" placeholder='Enter your State......' className='input_field'name="State" onChange={addresschange} value={user_address?.State}/><br />
<div style={{display:"flex",justifyContent:"center",width:"100%",marginBottom:"20px"}}>
  <label style={{fontSize:"20px",marginLeft:"20px"}}>Address_type :-</label>
<label style={{fontSize:"20px",margin:"auto"}}>

    <input type="radio" name="Address_type"  value="Home"
          checked={user_address.Address_type === "Home"}
          onChange={addresschange}/>
    Home
  </label>
  <label style={{fontSize:"20px",margin:"auto"}}>
    <input type="radio" name="Address_type" value="Work"  
    checked={user_address.Address_type === "Work"}
          onChange={addresschange}/>
    Work
  </label>
</div>
<div style={{display:"flex",justifyContent:"space-around",width:"90%",marginBottom:"30px"}}>
<button type='submit'style={{width:"40%",backgroundColor:"#3d76d1",border:"none",color:"white",padding:"10px"}} className='button_margin'>Submit</button>
<button style={{width:"40%",color:"#3d76d1",border:"none",backgroundColor:"white"}} className='button_margin'>Cancel</button>
</div>
</form>

{userstate?.Addresses && userstate?.Addresses?.map((address)=>(
  <div style={{border:"1px solid black",backgroundColor:"white",width:"80%",marginBottom:"40px",marginLeft:"10%",paddingLeft:"20px"}}>
  <p className='bg-secondary d-inline p-1' >{address?.Address_type}</p>
  <div style={{display:"flex"}}>
  <h5 style={{marginRight:"20px"}}>{address?.name}</h5>
  <h5>{address?.mobileNumber}</h5>
  </div>
  <div className='d-md-flex d-block'>
  <h5>{address?.Landmark}</h5>
  <h5>{address?.Locality}</h5>
 <h5>{address?.city}</h5>
 <h5> {address?.State} -</h5>
 <h5>{address?.zipcode}</h5>
  </div>
</div>
))}

    </div>
  )
}

export default ManageAddress
