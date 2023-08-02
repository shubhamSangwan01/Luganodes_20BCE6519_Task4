import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'


export const createUser= async (req,res)=>{
 console.log("Req Recieved")
 const {name,email,password} = req.body
 const user = await User.findOne({email: email})
 
    if(user){
        res.send({message: "User already registerd"})
    } 
    const newUser = new User({
            name,
            email,
            password
        })
    //hash password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newUser.password,salt)
    console.log(newUser)
    newUser.password = hashedPassword
    console.log(newUser)
    newUser.save()
    
   
    .then(()=>res.send({message:"User Registered Successfully"}))
    .catch(err=>console.log(err))

}

export const loginUser = async (req,res)=>{
    console.log(req.body.user)
    const user = await User.findOne({
		email: req.body.user.email,
	})
    console.log(user)
	if (!user) {
		res.send({message:"User not registered !"})
	}
    else{
	const isMatch= await bcrypt.compare(
		req.body.user.password,
		user.password
	)
    console.log(isMatch)
    if(isMatch){
        const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
                age:user.age,
                gender:user.gender,
                mobile:user.mobile

			},
			"secret123",
            {expiresIn:"1h"}
		)
       
        console.log(typeof token)
        res.send({  message:"Login Successful", token:token, status:'ok', user:user })
    } else {
            res.send({status : 'error' , message:"Incorrect Password"})
        }
    
    }
}
export const view = async (req,res)=>{
    const email = req.email
    const user = await User.findOne({email:email})
    if(!user){
        res.send({message:"User not found!"})
    }
    res.send({status:'ok' , user:user})
    
}

export const addUserDetails= async(req,res)=>{
    const email = req.email
    const updatedUser = req.body
    await User.findOneAndUpdate({email:email},updatedUser)
    .then(()=>res.send({message:"User Updated Successfully"}))
    .catch((err)=>console.log(err))
}

export const updateUserDetails=async(req,res)=>{
    const email = req.email
    const updatedUser = req.body
    await User.findOneAndUpdate({email:email},updatedUser)
    .then(()=>res.send({message:"User Updated Successfully"}))
    .catch((err)=>console.log(err))
}