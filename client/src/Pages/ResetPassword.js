import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password,setPassword]= React.useState('')
    const [confirmPassword,setConfirmPassword]= React.useState('')
    const navigate = useNavigate()
    const location = useLocation();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const token = new URLSearchParams(location.search).get("token");
        //check for same password
        if(!token){
            alert("Token not found!")
        }else{
            console.log(password)
           const res = await axios.post('http://localhost:5000/resetPassword',{token,password})
           if(res.status==200){
             alert("password changed successfully!")
             setTimeout(()=>{navigate('/')},1000)
           }
        }
    }
    
  return (
    <div className='container'><form style={{height:'fitContent',width:300}} onSubmit={handleSubmit} >
    <h1>Password Reset</h1>
      <ul className="loginForm__list">
          <li className="loginForm__input">
            <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="form-control" aria-describedby="emailHelp" placeholder="Enter new password"/>
            
          </li>
          <li className="loginForm__input">
            <input type="password" name="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} className="form-control" aria-describedby="emailHelp" placeholder="Confirm new Password"/>
            
          </li>
          <li id="loginForm__signIn">
            <button type="submit">Submit</button>
          </li>
          
      </ul>
    </form></div>
  )
}

export default ResetPassword