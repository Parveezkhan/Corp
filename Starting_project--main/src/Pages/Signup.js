import React, { useEffect, useState } from 'react';
import {  NavLink,Link, useNavigate ,useHistory } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import '../styles/login.css'
import logo from "../images/Logo.png"
import axios from "axios";
import toast from 'react-hot-toast';



const Signup=()=>{

  const [nav,setNav] = useState('');
  const [error,setError]=useState('');
  const [purpose,setPurpose]=useState('');
 
  const [emailAddress,setEmailAddress] = useState('');
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]= useState('');
  

  const navigate=useNavigate()
  const handleData=async (e)=>{
      e.preventDefault();
      
      // console.log(JSON.parse(localStorage.getItem('credentials')).name.value)
     if(e.target.password.value === e.target.confirm_password.value){
      try{
        const res  =await axios.post('http://localhost:5000/api/auth/register',
        {
          emailAddress,
          password,
          purpose,
        });
        if(res && res.data.success){
          toast.success(res.data && res.data.message);
          navigate('/login')
        }
        else{
          console.log('no')
          toast.error(res.data.message);
        }
        }
      catch(error){
            console.log(error)
          }
     } 
     else {
      console.log('mismatch')
      toast.error('Password Mismatch')
     }
      
    };
  return(
    <>
    <Navbar/>
    <div className='container'>
    
    <div className='user-credentials position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center'>
    <div className='logo  d-flex ' >
           <img src={logo} alt='' className='logo1 ' style={{width:'100px' , height:'100px'}}></img>
        </div>
    <form  style={{width:'300px' }} className='form' onSubmit={handleData}>
  <div class="form-group m-2" >
    <p id="error">{error}</p>
    <label for="email" className='lab'>Email address</label>
    <input type="email" value={emailAddress} class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email/username" onChange={(e)=>setEmailAddress(e.target.value)}/>
    
  </div>
  <div class="form-group m-2">
    <label for="password" className='pass'>Password</label>
    <input type="password" value={password} class="form-control mb-3" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
  </div>

  <div class="form-group m-2">
    <label for="confirm_password" className='pass'>Confirm Password</label>
    <input type="password" value={confirmPassword} class="form-control mb-3" id="confirm_password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
  </div>

  <div class="form-group m-2">
    <label for="purpose" className='pass'>Purpose</label>
    <select value={purpose} placeholder="Select Purpose" className='form-control' onChange={(e)=>{setPurpose(e.target.value)}}>
      <option value='learning' name='learning'>Learning</option>
      <option value='corporate' name='corporate'>Corporate</option>
      <option value='other' name='other'>Other</option>
    </select>
  </div>
  
   <button type="submit" class="btn btn-primary m-2" style={{width:'250px'}}>Signup</button>

  
  <div className=' mx-4'>
    <Link to="/login" className='mx-3 link' >Already registered?.signin</Link>
</div>
</form>
    </div>
    
    </div>
    </>
  )
}
export default Signup;