import React, { useEffect } from 'react';
import "./MyOrders.css";
import { useDispatch, useSelector } from 'react-redux';
import { loggeduserAction } from '../../Redux/MiddlewareActions';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Container, Box, Paper, Typography, Grid, Button } from '@mui/material';
import CustomizedDialogs from '../../Pages/Modalpopup';

function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("userdata"));
  const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details));

  useEffect(() => {
    if (userdetails) {
      console.log("user", userdetails);
      dispatch(loggeduserAction(userdetails?.user?._id));
    }
  }, []);

  console.log(userstate, 'pdft');

  return (
    <>
      {userdetails && userstate?.purchasedproducts?.length !== 0 && userstate?.purchasedproducts?.map((product, index) => (
        <Container sx={{ marginBottom: "10px" }} key={index} onClick={()=>navigate(`/product/${product?._id}`)}>
          <Paper elevation={7}>
            <Container sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2} alignItems="center" justifyContent='flex-start' display='flex'>
                    <Box sx={{ display: "flex", justifyContent: { xs: "space-between", md: "flex-start" }, alignItems: "center" }}>
                      <img src={product?.images[0]} className="orders_image" alt="Product" />
                      <Box sx={{ marginLeft: { xs: "20px", md: "0px" } }}>
                        <Typography variant="h6" fontWeight='bolder'>{product?.name}(model)</Typography>
                        <Typography variant="body2" color="textSecondary">Color:Yellow</Typography>
                        <Typography variant="body1">Specifications: 12GB 256GB</Typography>
                        <Button variant="outlined" size="small" sx={{ marginTop: "10px" }} onClick={(e)=>{e.stopPropagation()
                        }}><CustomizedDialogs productdata={product}/></Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={2} sx={{ textAlign: { xs: "center", md: "justify" } }}>
                  <Typography variant="h6" fontWeight={900}>$ {product?.price}</Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: { xs: "flex", md: "block" }, justifyContent: "space-between" }}>
                  <Typography>Delivered on 29feb 2024</Typography>
                  <Button variant='text'>Check Delivery status </Button>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Container>
      ))}
    </>
  );
}

export default MyOrders;






{/* <div className='my_cart'>
  //  <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
  // <input type="search" className='search_bar'/>
  // <button className='search_button'>Search</button>
  // </div>
  // {userdetails && userstate?.purchasedproducts?.length !== 0 ? userstate?.purchasedproducts?.map((product)=>{
     return(
  //     <div className='my_order_block' onClick={()=>navigate(`/product/${product?._id}`)}>
  //     <img src={product?.images[0]} className="orders_image"/>
  //     <div style={{margin:"auto"}}>
  //     <p>{product?.name}</p>
  //     <p>color:Sun flower</p>
  //     </div>
  //     <div style={{margin:"auto"}}>
  //     <p>${product?.price}</p>
  //     </div>
  //     <div style={{margin:"auto"}}>
  //     <p >Delivered on Mar29</p>
  //     <p>Your item has been delivered</p>
  //     </div>
  //   </div>
  //   )
  // }):<h1 style={{textAlign:"center",fontWeight:"bold"}}>No orders</h1>} 
  </div>  */}