import React,{useState} from 'react';
import "./Dashboard.css";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { data,pie_data,options,pie_options } from './Graphs/Graphs';
import { Chart } from "react-google-charts";
function Dashboard() {

 
  return (
    <div>
    <h1 class="admin_dashboard">DashBoard</h1>
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <div style={{display:"flex",backgroundColor:"white",width:"250px",padding:"15px",borderRadius:"10px"}}>
      <AiFillDollarCircle style={{color:"blue",backgroundColor:"skyblue",borderRadius:"50%",marginLeft:"15px",fontSize:"40px",padding:"6px"}}/> 
       <p style={{fontWeight:"bold",marginLeft:"20px"}}>Total Sales<br />$12,234</p>
    
     </div>
     <div style={{display:"flex",backgroundColor:"white",width:"250px",padding:"15px",borderRadius:"10px"}}>
      <BiSolidShoppingBags style={{color:"green",backgroundColor:"skyblue",borderRadius:"50%",marginLeft:"15px",fontSize:"40px",padding:"6px"}}/> 
       <p style={{fontWeight:"bold",marginLeft:"20px"}}>Total Orders<br />130</p>
    
     </div>
     <div style={{display:"flex",backgroundColor:"white",width:"250px",padding:"15px",borderRadius:"10px"}}>
      <FaShoppingBag style={{color:"yellow",backgroundColor:"skyblue",borderRadius:"50%",marginLeft:"15px",fontSize:"40px",padding:"6px"}}/> 
       <p style={{fontWeight:"bold",marginLeft:"20px"}}>Total Products<br />70</p>
    
     </div>
    </div>
    <div style={{display:"flex",marginTop:"30px",justifyContent:"space-around",marginBottom:"30px"}}>
      <div style={{backgroundColor:"white",width:"500px",marginRight:"20px",textAlign:"center"}}>
    <h4 data="123">Sales Statistics</h4>
   
    <Chart
     chartType="Bar"
     width="100%"
     height="400px"
     data={data}
     options={options}
   />
    </div>
    <div style={{backgroundColor:"white",width:"500px",marginRight:"30px",textAlign:"center"}}>
    <h4>Products Statistics</h4>
    <Chart
       chartType="PieChart"
       data={pie_data}
       options={pie_options}
       width={"100%"}
       height={"400px"}
     />
    </div>
    </div>
    </div>
  )
}

export default Dashboard
