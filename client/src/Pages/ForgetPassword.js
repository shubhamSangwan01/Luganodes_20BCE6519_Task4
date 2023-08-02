import React from 'react'
import axios from 'axios';

const ForgetPassword = () => {
    const [email,setEmail] = React.useState('');
    const handleResetPassword =async(e)=>{
     e.preventDefault();
     const res = await axios.post('http://localhost:5000/forgetpassword',{email});

     if(res.status==200){
        alert("Please check you email for resetting.")
     }

    }
  return (
    <div className='container'><form style={{height:'fitContent',width:300}} onSubmit={handleResetPassword} >
    <h1>User Login</h1>
      <ul className="loginForm__list">
          <li className="loginForm__input">
            <input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"/>
            
          </li>
          <li id="loginForm__signIn">
            <button type="submit">Reset</button>
          </li>
          
      </ul>
    </form></div>
  )
}

export default ForgetPassword