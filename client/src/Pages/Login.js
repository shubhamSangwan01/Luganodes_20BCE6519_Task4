import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/login.css'
import {ToastContainer ,toast} from 'react-toastify'
import axios from 'axios'

const Login = ({formType,setFormType}) => {

  const navigate = useNavigate()
  const [login,setlogin] = React.useState({
    email:"",
    password:""
  })
  const [signup,setsignup] = React.useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:""
  })
  const handleLoginChange =(e)=>{
    const {name,value} = e.target
   
    setlogin({
    ...login,
    [name]:value
   })
  }
  const handleSignupChange =(e)=>{
    const {name,value} = e.target
   
    setsignup({
    ...signup,
    [name]:value
   })
  }
  console.log(login,signup)
  const handleSubmit=(e)=>{
      }
    
  
  return (
 <div className='container'>
  {/* <ToastContainer/> */}
  <div class="navBar_container">
    <div class="navBar">
      <ul>
        <img src="/images/logo.webp" alt="logo"/>
        <div>
        <li onClick={()=>{setFormType("login")}}><span>Login</span></li>
        <li onClick={()=>{setFormType("signup")}}><span>Sign Up</span></li>
      </div>
      </ul>
    </div>
  </div>
  {formType == "login" && (
    <form style={{height:'fitContent',width:300}} onSubmit={handleSubmit}>
    <h1>User Login</h1>
      <ul className="loginForm__list">
          <li className="loginForm__input">
            <input type="email" name="email" onChange={handleLoginChange} value={login.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"/>
          </li>
          <li className="loginForm__input">
            <input type="password" value={login.password} onChange={handleLoginChange}  className="form-control" name='password' placeholder="Enter Password"/>
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
                <img src="/images/apple.png" alt="Apple" onClick={console.log("apple")} />
              </li>
              <li id="facebook">
                <img src="/images/facebook.png" alt="Facebook" onClick={console.log("facebook")} />
              </li>
            </ul>
          </li>
      </ul>
    </form>
  )}
  {formType == "signup" && (
    <form style={{height:'fitContent',width:300}} onSubmit={handleSubmit}>
    <h1>User Sign Up</h1>
      <ul className="loginForm__list">
          <li className="loginForm__input">
            <input type="text" name="name" onChange={handleSignupChange} value={signup.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"/>
          </li>
          <li className="loginForm__input">
            <input type="email" name="email" onChange={handleSignupChange} value={signup.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"/>
          </li>
          <li className="loginForm__input">
            <input type="password" value={signup.password} onChange={handleSignupChange}  className="form-control" name='password' placeholder="Enter Password"/>
          </li>
          <li className="loginForm__input">
            <input type="password" value={signup.password} onChange={handleSignupChange}  className="form-control" name='confirmpassword' placeholder="Re-enter Password"/>
          </li>
          <li id="loginForm__signIn">
            <button type="submit">Sign Up</button>
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
                <img src="/images/apple.png" alt="Apple" onClick={console.log("apple")} />
              </li>
              <li id="facebook">
                <img src="/images/facebook.png" alt="Facebook" onClick={console.log("facebook")} />
              </li>
            </ul>
          </li>
      </ul>
    </form>
  )}
  </div> 
  )
}

export default Login