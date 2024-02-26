import React,{useState} from 'react'
import "./Signup.css"
import { useDispatch, useSelector } from 'react-redux';
import { signupActions } from '../../Redux/MiddlewareActions';
import { Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { red,blue } from '@mui/material/colors';
import { Container,Box,Avatar, Typography, Grid, TextField,Button,Breadcrumbs,FormHelperText} from '@mui/material';
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const payload ={
    firstname,lastname,email,password
  }
  const userdata = useSelector((state) => state.userReducer);

  const signupformSubmit=async(e)=>{
    e.preventDefault();
await dispatch(signupActions(payload))
    console.log(firstname,lastname,email,password);
    setTimeout(()=>{
navigate("/login")
    },2000)
  }

 return (
<Container maxWidth="sm">
<form onSubmit={signupformSubmit}>

<Grid container spacing={2} marginTop='auto' >
      <Grid item xs={12} textAlign='center' >
        <Box sx={{ margin: "auto" }}>
          <Avatar sx={{ margin: "auto", backgroundColor: "#3f51b5" }}>
            <FaLock />
          </Avatar>
        </Box>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          required
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)}
        />
        
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)}
        />
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
         {userdata.isLoading ? "loading........":"Register"}
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent='flex-end' display='flex'>
      <Breadcrumbs  aria-label="breadcrumb" separator="?">
      <Typography color="text.primary" >Already have an account</Typography> 
      <Link to="/login">
        <Typography variant='h6' color="primary.main" sx={{textDecoration:"underline"}}>LOGIN</Typography>
        </Link>
      </Breadcrumbs>
      </Grid>
    </Grid>
  
</form>
</Container>


  )
}

export default Signup
