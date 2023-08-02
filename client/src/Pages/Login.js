import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/login.css'
import {ToastContainer ,toast} from 'react-toastify'
import axios from 'axios'

const Login = ({login,setLogin}) => {

  const navigate = useNavigate()
  const [user,setUser] = React.useState({
    email:"",
    password:""
  })
  const handleInputChange =(e)=>{
    const {name,value} = e.target
   
    setUser({
    ...user,
    [name]:value
   })
  }

  const handleSubmit=(e)=>{
      }
    
  
  return (
 <div className='container'>
  {/* <ToastContainer/> */}
  <form style={{height:'fitContent',width:300}} onSubmit={handleSubmit}>
  <h1>User Login Page</h1>
    <ul className="loginForm__list">
        <li className="loginForm__input">
          <input type="email" name="email" onChange={handleInputChange} value={user.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"/>
        </li>
        <li className="loginForm__input">
          <input type="password" value={user.password} onChange={handleInputChange}  className="form-control" name='password' placeholder="Enter Password"/>
        </li>
        <li id="loginForm__resetPassword">
          <span>Reset Password ?</span>
        </li>
        <li id="loginForm__signIn">
          <button type="submit">Sign In</button>
        </li>
        <li id="loginForm__line__li">
          <div className="loginForm__line"></div>
          <span>Or continue with</span>
          <div className="loginForm__line"></div>
        </li>
        <li id="loginForm__buttons">
          <ul className="loginForm__buttons__list">
            <li id="google">
              <img src="/images/google.png" alt="Google" onClick={console.log("google")} />
            </li>
            <li id="apple">
              <img src="/images/apple.png" alt="Google" onClick={console.log("google")} />
            </li>
            <li id="facebook">
              <img src="/images/facebook.png" alt="Google" onClick={console.log("google")} />
            </li>
          </ul>
        </li>
    </ul>
</form>
</div> 
  )
}

export default Login