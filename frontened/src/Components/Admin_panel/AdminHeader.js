import React,{useState} from 'react';
import "./AdminHomePage.css";
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import Travel from "../../Images/aeroplane.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { AiFillDollarCircle } from "react-icons/ai";
import Dashboard from './Dashboard.js';
import CreateProduct from './Products/CreateProduct.js';
import CreateNewproduct from './Products/CreateNewproduct.js';
import Categories from './Products/Categories.js';
import { Outlet, Link,useNavigate } from "react-router-dom"

function AdminHeader() {
 const navigate = useNavigate()
    return (
<div>
<div class="sidebar">
<aside id="sidebar">
               <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                           <img src={Travel} style={{ width: "100px", height: "100px"}} />
                             <RxHamburgerMenu />
                          </div>
                         <ul style={{ listStyleType: "none" }}>
                              <li onClick={()=>navigate("/admin_panel/Dashboard")}><FaHome style={{ marginRight: "10px" }} />Dashboard</li>
                             <li  onClick={()=>navigate("/admin_panel/CreateProduct")}><FaShoppingBag style={{ marginRight: "10px" }} />products</li>
                             <li  onClick={()=>navigate("/admin_panel/CreateNewproduct")}><FaShoppingCart style={{ marginRight: "10px" }} />Add products</li>
                             <li  onClick={()=>navigate("/admin_panel/Categories")}><BiSolidCategory style={{ marginRight: "10px" }} />Categories</li>
                             <li  onClick={()=>navigate("/admin_panel/Orders")}><BiSolidShoppingBags style={{ marginRight: "10px" }} />Orders</li>
                             <li ><FaUser style={{ marginRight: "10px" }} />Users</li>
                             <li><SiHomeassistantcommunitystore style={{ marginRight: "10px" }} />Sellers</li>
                              <li><AiFillDollarCircle style={{ marginRight: "10px" }} />Transactions</li>
                        </ul>
               
           </aside>
    
  </div>
  <section class="home-section">
    <nav>
    <div style={{ backgroundColor: "white", width: "100%", height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ position: "relative", width: "30%" }}>
                         <input type="search" style={{ width: "100%" }} />
                         <CiSearch style={{ fontSize: "25px", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }} />
                    </div>
                      <div style={{ display: "flex", marginRight: "30px" }}>
                        <IoNotifications style={{ fontSize: "25px", marginRight: "20px" }} />
                          <p style={{ marginRight: "20px" }}>English</p>
                        <img src={Travel} style={{ height: "40px", width: "40px", borderRadius: "50%", border: "2px solid #A8A8A8" }} />
                      </div>
    </div>

    </nav>

    <div class="home-content">
       
{/* {window.location.pathname === "/admin_panel/Dashboard" && <Dashboard /> }
{window.location.pathname === "/admin_panel/CreateProduct" && <CreateProduct /> }
{window.location.pathname === "/admin_panel/CreateNewproduct" && <CreateNewproduct />}
{window.location.pathname === "/admin_panel/Categories" && <Categories />  }
  */}
  {window.location.pathname === "/admin_panel" ? <Dashboard />:<Outlet />}

    </div>
  </section>
</div>



       



    );
}

export default AdminHeader;
