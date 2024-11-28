import React from 'react';
import { useState ,useContext} from 'react';
import {  NavLink,Link,useNavigate ,useLocation} from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import '../styles/login.css'
import logo from "../images/Logo.png"
import axios from 'axios';
import toast from 'react-hot-toast';

import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../context/auth';

console.log(AuthContext)

const Login= ()=>{
 const navigate = useNavigate();
 const location = useLocation();

 const [auth,setAuth]=useContext(AuthContext)
 const [emailAddress,setEmailAddress] = useState('');
 const [password,setPassword] = useState('');

 const handleData=async (e)=>{
   e.preventDefault();
   try{
    const res = await axios.post('http://localhost:5000/api/auth/login',{
      emailAddress,
      password,
     });
     if(res && res.data.success){
      toast.success(res.data.message)
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token,
      })
      localStorage.setItem('auth',JSON.stringify(res.data))
      navigate(location.state || '/');
     }
     else{
      toast.error(res.data.message)
     }
   }
   catch(error){
    console.log(error)
   }
   
   }
  
  return(
    <>
    <Navbar/>
    <div className='container'>
    
    <div className='user-credentials position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center'>
    <div className='logo  d-flex' >
           <img src={logo} alt='' className='logo1 ' style={{width:'150px' , height:'150px'}}></img>
        </div>
    <form  style={{width:'200px' }} className='form' onSubmit={handleData}>
  <div class="form-group m-2" >
    <label for="exampleInputEmail1" className='lab'>Email address</label>
    <input type="email" 
    class="form-control" 
    id="exampleInputEmail1" 
    value={emailAddress}
    aria-describedby="emailHelp"
    placeholder="Enter email/username"
    onChange={(e)=>setEmailAddress(e.target.value)}
    />
    
  </div>
  <div class="form-group m-2">
    <label for="exampleInputPassword1" className='pass'>Password</label>
    <input type="password" 
    class="form-control mb-3"
     value={password}
     id="exampleInputPassword1" 
     placeholder="Password"
    onChange={(e)=>setPassword(e.target.value)}
     />
  </div>
   <button type="submit" class="btn btn-primary m-2" style={{width:'250px'}}>Login</button>
  <div className='last d-flex flex-column justify-content-center '>

  <div className='login-with m-2 text-center justify-content-center'>
   <span>or </span>
   <span>Login with</span>
   <div className='g-icon border border-2 border-white p-2 m-2 '><GoogleIcon/> Google
   </div>
</div>

  <div class="form-check mx-5">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label" for="flexCheckDefault">
    Remember me
  </label>
</div>
{/* <div className='forgot-password mx-5'>
    <Link to="/" className='mx-3 link' >Forgot password?</Link>
</div> */}


  </div>
  
</form>
    </div>
    
    </div>
    </>
  )
}
export default Login;