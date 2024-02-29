import React, { useState, useEffect } from 'react'
import { FaTags } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import Rating from '../Rating&Reviews/Rating';
import { GrCart } from "react-icons/gr";
import axios from "axios";
import { API } from '../../API/API';
import { FaRegStar } from "react-icons/fa";
import Comments from '../Comments/Comments.js';
import { useParams } from 'react-router-dom';
import "./Singleproduct.css"
import { toast } from 'react-toastify';
import { loggeduserAction } from "../../Redux/MiddlewareActions.js";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button, Stack, Divider, Box } from '@mui/material';
function Singleproduct() {
  const { id } = useParams();
  const dispatch = useDispatch()
  console.log("id", id)
  const [particularproductdata, setParticularproductdata] = useState(null);
  const [imageId, setImageId] = useState(null)
  const userdetails = JSON.parse(localStorage.getItem("userdata"));
  const userstate = useSelector((state) => (state.UserDetailsReducer?.user?.user_details))
  useEffect(() => {
    if (userdetails) {
      dispatch(loggeduserAction(userdetails?.user?._id))
    }
  }, [])

  useEffect(() => {
    axios.get(API + `product/${id}`).
      then((res) => setParticularproductdata(res.data)).catch((error) => console.log(error.message))
  }, [id])



  const imageschange = (idx) => {
    setImageId(idx)
  }
  const Item_Added_to_cart = (e, product_id) => {
    e.preventDefault();
    console.log("product_id", product_id);
    axios.post(API + "item_add_to_cart", {
      user_id: userdetails?.user,
      product_id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': userdetails?.token
      }
    }).then((data) => {
      localStorage.setItem("cartdata", JSON.stringify(data.data));
      toast.success(`product successfully added to cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }).catch((error) => console.log(error.message));
  }

  const productpresentornotinpurchasedproduct = userstate?.purchasedproducts?.findIndex((product) => product?._id?.toString() == id)
  const productpresentornotincart = -1
  console.log(productpresentornotincart, "productpresentornotincart")
  console.log(productpresentornotinpurchasedproduct, "productpresentornotinpurchasedproduct")
  console.log(particularproductdata, 'particular')
  console.log("redux", userstate)
  return (
    <>

      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} md={2} order={{ xs: 2, md: 1 }} >
            <Box spacing={2} sx={{ display: { xs: 'flex', md: "block" } }} >
              {particularproductdata && particularproductdata?.particularproduct?.images?.map((data, idx) => {
                return (
                  <img
                    key={idx}
                    src={data}
                    style={{ height: '100px', width: "100px", margin: "0px 0px 10px 10px" }}
                    onMouseOver={() => imageschange(idx)}
                  />
                )
              })}

            </Box>
          </Grid>

          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>

            <img
              src={!imageId ? particularproductdata?.particularproduct?.images[0] : particularproductdata?.particularproduct.images[imageId]}
              alt="product"
              style={{ width: '100%', height: "430px" }}
            />

            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>

              {productpresentornotincart == -1 ?
                <button style={{ border: "none", backgroundColor: "#ff9f00", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}
                  onClick={(e) => Item_Added_to_cart(e, particularproductdata?.particularproduct?._id)}>
                  <FaShoppingCart style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />ADD TO CART</button> :
                <button style={{ border: "none", backgroundColor: "#ff9f00", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}   >
                  <FaShoppingCart style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />GO TO CART</button>}

              <button style={{ border: "none", marginLeft: "30px", backgroundColor: "#f08b07", padding: "15px", color: "white", fontWeight: "bold", fontSize: "15px" }}>
                <AiFillThunderbolt style={{ fontSize: "30px", color: "white", marginRight: "10px" }} />BUY NOW</button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} order={3}>
            <Typography variant='body1' fontWeight={500}>dkian Digital Kids camera 20MP 1080P with 32GB Memory Card Mini Mirrorless Camera  (Pink)</Typography>
            <Stack direction='row' marginTop={1} marginBottom={1}>
              <Button variant="contained" color="success" endIcon={<FaRegStar />} size='small' sx={{ padding: "0px",margin:"0px"}}>
                {particularproductdata?.particularproduct?.rating}
              </Button>
              <Typography variant='subtitle1' color='grey' fontWeight={500}>
                {particularproductdata?.particularproduct?.comments?.length} Reviews & Rating</Typography>
            </Stack>
            <Stack direction='row' spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant='h4' fontSize={35} fontWeight={400} >₹ {particularproductdata?.particularproduct?.price}</Typography>
              <Typography style={{ textDecoration: "line-through" }}>₹5,999</Typography>
              <Typography color="green">47% off</Typography>
            </Stack>
            <Typography variant='h6' fontweight="bold" marginTop={4} marginBottom={4}>Available Offers</Typography>

            <Typography variant="body1" fontWeight='bold' color='grey'>Description:-</Typography>
            <Typography variant='subtitle1' fontSize='15px' color="grey">{particularproductdata?.particularproduct?.description}</Typography>

            <Divider sx={{ borderRadius: 2, boder: "3px solid", borderColor: "divider", backgroundColor: "grey", width: "100%" }} variant="fullWidth" />
            <Typography variant='h6' fontweight="bold" marginTop={2} marginBottom={2}>Specifications</Typography>
            <Divider sx={{ borderRadius: 2, boder: "3px solid", borderColor: "divider", backgroundColor: "grey", width: "100%" }} variant="fullWidth" />
            {[1, 2, 3, 4, 5, 6]?.map((data, index) => {
              return (
                <Container>
                  <Box style={{ display: "flex",}}>
                    <Box color="black">{index + 1}</Box>
                    <Typography marginBottom='10px' color='grey' sx={{wordBreak:"break-all"}}>.poojncjsdcdcdjbcehgcexcbdscjsdchjscbuchdcbhddddddddddddddddddd</Typography>
                  </Box>
                </Container>
              )
            })}
            <Rating Rating={particularproductdata?.particularproduct?.rating} />
            <Comments comments={particularproductdata?.particularproduct?.comments} rating={particularproductdata?.particularproduct?.rating} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Singleproduct;
