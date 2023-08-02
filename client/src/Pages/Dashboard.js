import React, { useEffect } from 'react'
import '../styles/dashboard.css'
import { Link , useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { toast } from 'react-toastify'


const Dashboard= ({login,setLogin}) => {
     const [eth,setEth] = React.useState('')
    const navigate = useNavigate()
    const onChange =()=>{
      setToggleViewEdit({
        view:!toggleViewEdit.view,
        edit:!toggleViewEdit.edit
      })
    }
    const handleInputChange = (e)=>{
      
      const {name,value} = e.target
      setUserData({
        ...userData,[name]:value
      })
  
    }
    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(eth){
       const res= await axios.post("http://localhost:5000/updateMetaUser",{...userData,metaId:eth})
       if(res.status==200){
           alert("User data updated successfully.")
       }
      }
      else{
        userData.updated=true;
        const newUser = userData
        const res =await axios.post('http://localhost:5000/addUserDetails',newUser,{
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        })
       if(res.data.message){
        toast.success(res.data.message)
        setTimeout(()=>{
          setToggleViewEdit({
            view:!toggleViewEdit.view,
            edit:!toggleViewEdit.edit
          })
        },1000)
        
        
        }
      }
      
    }
const [toggleViewEdit , setToggleViewEdit] = React.useState({
  view:false,
  edit:true,
})
const [toggleUpdateCreate, setToggleUpdateCreate] = React.useState({
   updated:false
})
const [userData,setUserData] = React.useState({
  name:"",
  email:"",
  age:"",
  mobile:"",
  gender:"",
  updated:false
})
  const displayInfo = async (user)=>{

    const res = await axios.get('http://localhost:5000/view',
    {
      headers:{
        'x-access-token': localStorage.getItem('token')
      }
    })
    
   console.log(res)
    setUserData({...userData,...res.data.user})
    

  }
  console.log(userData)
useEffect(()=>{
  
    const token = localStorage.getItem('token')
    const ethId = sessionStorage.getItem("UserMetaMaskId");

    
    try {
  if(token){
      const user = jwt_decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('/')
      } else {
        
        displayInfo(user)
      }
    }
    else if(ethId==='' || ethId===undefined){
        navigate('/')
    }
    else if(ethId!==''){
        setEth(ethId)
       axios.post('http://localhost:5000/getMetaUser',{metaId:ethId}).then(res=>{
        setUserData(res.data.metaUser)
       })
    }
  }
     catch (error) {
      console.log(error)
    }
  },[])
  const handleLogOut = ()=>{
    localStorage.clear()
    sessionStorage.clear()
    setTimeout(() => {
      navigate('/')
    }, 1000);
    
     
  }
  return (
 <div className='container'>
  <h1>Welcome {userData.name}</h1>
  <button style={{background:'crimson'}} className='btn btn-secondary' onClick={handleLogOut} type='button'>LogOut</button>
  
 {toggleViewEdit.view && <div>
      <div>
        <div className="card">
          <div className="card-header">
            <p> Your Details</p>
          </div>
          <div className="container">
            <strong>Age: </strong>
            <span>{userData.age}</span>
            <br/>
            <br/>
            <strong>Gender: </strong>
            <span>{userData.gender}</span>
            <br/>
            <br/>
            <strong>Mobile Number: </strong>
            <span>{userData.mobile}</span>
            <br/>
            
            <br/>
            <Link to="/dashboard">
              <button className="btn btn-primary" style={{width:'100%'}} onClick={onChange}>Edit</button>
            </Link>
          </div>
        </div>
    </div>
    </div> } 

 {toggleViewEdit.edit && <div>
      
  <form onSubmit={handleSubmit} className='form' style={{height:'fitContent',width:300}}>
  {eth && <><label htmlFor="age">Name</label>
  <input type="text" onChange={handleInputChange} className="form-control" value={userData.name} name='name' placeholder="Enter Name"/></>}
  
  <label htmlFor="age">Age</label>
  <input type="number" onChange={handleInputChange} className="form-control" value={userData.age} name='age' placeholder="Enter Age"/>


  <label htmlFor="gender">Gender</label>
  <input name='gender' onChange={handleInputChange} type="text" value={userData.gender} className="form-control" placeholder="male/female"/>


  <label htmlFor="mobile">Mobile No</label>
  <input type="text" onChange={handleInputChange} className="form-control" value={userData.mobile} name='mobile' placeholder="XXXX XXXXXX"/>


  <input type="submit" style={{display:'block', width:'100%'}}  className="btn btn-primary " value={userData.age||userData.mobile||userData.gender?'Edit':'AddData'}/>
  <button type="button" style={{display:'block', width:'100%'}} className="btn btn-primary " onClick={onChange}>View</button>
</form> 
    </div>}



</div> 
  )
}

export default Dashboard