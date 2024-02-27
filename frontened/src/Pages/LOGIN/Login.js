import React,{useState} from 'react'
import "./Login.css"
import axios from 'axios';
import { API } from '../../API/API';
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { Container,Box,Avatar, Typography, Grid, TextField,Button,Breadcrumbs,FormHelperText} from '@mui/material';
import { FaLock } from 'react-icons/fa';
function Login() {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const navigate = useNavigate()

 
  const loginformsubmit = async (e) =>{
    e.preventDefault();
   await axios.post(API+"login",{email,password}).
   then(async (res)=>{
   await localStorage.setItem("userdata",JSON.stringify(res.data));
   setEmail('');
   setPassword('');
   navigate("/")
  }).catch((error)=>{
  console.log(error.message);
  toast.error(`${error.response.data} `, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })
 })
  }
  return (
  
<Container maxWidth="sm">
<form onSubmit={loginformsubmit} margin="auto">

<Grid container spacing={2} marginTop='auto'>
      <Grid item xs={12} textAlign='center' >
        <Box sx={{ margin: "auto" }}>
          <Avatar sx={{ margin: "auto", backgroundColor: "#3f51b5" }}>
            <FaLock />
          </Avatar>
        </Box>
        <Typography variant="h5" gutterBottom>LOG IN</Typography>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          required
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <FormHelperText style={{ color: 'red' }}>Please enter a valid email address</FormHelperText> */}
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <FormHelperText style={{ color: 'red' }}>{userdata.isLoading ?"Please enter minimum 8 characters password":""}</FormHelperText> */}
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          LOG IN
         {/* {userdata.isLoading ? "loading........":"Register"} */}
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent='flex-end' display='flex'>
      <Breadcrumbs  aria-label="breadcrumb" separator="?">
      <Typography color="text.primary" >Don't have an account</Typography> 
      <Link to="/signup">
        <Typography variant='h6' color="primary.main" sx={{textDecoration:"underline"}}>SIGN UP</Typography>
        </Link>
      </Breadcrumbs>
      </Grid>
    </Grid>
  
</form>
</Container>
  )
}

export default Login
