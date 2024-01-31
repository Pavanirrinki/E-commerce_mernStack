import React,{useState,useEffect} from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/LOGIN/Login';
import Signup from './Pages/SIGNUP/Signup';
import HomePage from './Pages/HomePage/HomePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MyOrders from './Components/MyOrders/MyOrders';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './Components/Cart/Cart';
import Singleproduct from './Pages/SingleProduct/Singleproduct';
import AdminHomePage from './Components/Admin_panel/AdminHomePage';
import Dashboard from './Components/Admin_panel/Dashboard';
import CreateProduct from './Components/Admin_panel/Products/CreateProduct';
import CreateNewproduct from './Components/Admin_panel/Products/CreateNewproduct';
import Categories from './Components/Admin_panel/Products/Categories';
import EditProduct from './Components/Admin_panel/Products/EditProduct';
import ManageAddress from './Components/Manage Address/ManageAddress';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Orders from './Components/Admin_panel/Orders';
import ParticularCategory from './Components/Category_products/ParticularCategory';
import Searchcategoryproducts from './Components/Category_products/Searchcategoryproducts';
import PaymentSuccessful from './Pages/PaymentSuccessful';
function App() {
 
  const userdata = useSelector((state) => state);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const noHeaderFooterRoutes = ['/login', '/signup', '/admin_panel',"/Cart","/payment_successful"];
console.log()
const shouldDisplayHeaderFooter = () => {

  return (!noHeaderFooterRoutes.some(route => window.location.pathname.includes(route)))

};

useEffect(() => {
  shouldDisplayHeaderFooter();
  
}, [navigate])

  return (
    <div>
      {shouldDisplayHeaderFooter() &&<div> 
        <Header />
        </div>}
<div>
      <Routes >
        <Route path='/'  element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Myorders' element={<MyOrders />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/product/:id' element={<Singleproduct />} />
        <Route path='manage_address' element={<ManageAddress />} />
        <Route path='place_order' element={<PlaceOrder />} />
        <Route path='/particularcategory/:ParticularCategory' element={<ParticularCategory />} />
        <Route path="/searchcategoryproducts/:category" element ={<Searchcategoryproducts />} />
        <Route path="/payment_successful" element={<PaymentSuccessful />} />
 {/* --------------------------------------ADMIN ROUTES-------------------------------------- */}
<Route path='/admin_panel' element={<AdminHomePage />} >
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='CreateProduct' element={<CreateProduct />} />
          <Route path='CreateNewproduct' element={<CreateNewproduct />} />
          <Route path='Categories' element={<Categories />} />
          <Route path ="Orders" element={<Orders />} />
          <Route path='Edit_product/:id' element={<EditProduct />} />
         
        </Route>
       
      </Routes>
       </div>
      {shouldDisplayHeaderFooter() && <Footer />}

    </div>
  );
}

export default App;
