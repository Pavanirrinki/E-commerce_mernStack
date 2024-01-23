import React,{useState} from 'react'
import "./Signup.css"
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { signupActions } from '../../Redux/MiddlewareActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    <div className='body'>
<div class="signup-container">
    <div class="profile-pic1">
   <CgProfile />
        </div>
    <div class="content">
      <form  onSubmit={signupformSubmit}>
        <div class="user-details">
          <div class="input-box" >
            <span class="details">First Name</span>
            <input type="text" placeholder="Enter your name" value={firstname} onChange={(e) => setFirstname(e.target.value)}  required />
          </div>
          <div class="input-box">
            <span class="details">LastName</span>
            <input type="text" placeholder="Enter your lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
         
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
         
        </div>
 
        <div class="button">
          <input type="submit" value={userdata.isLoading ? "loading........":"Register"} />
          <p style={{marginTop:"0px",textAlign:"center",fontWeight:"bold"}}>Already have account ?
          <Link to="/login" className='link-router-dom'> LOG IN</Link></p>
        </div>
       
      </form>
     
    </div>
  </div>
    </div>
  )
}

export default Signup
