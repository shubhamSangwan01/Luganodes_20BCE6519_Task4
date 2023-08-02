import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import Eth from '../models/eth.js'
import nodemailer from 'nodemailer'
import Token from '../models/token.js'


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
        });
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
    console.log(req.email)
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

export const addMetaUser = async(req,res)=>{
    const {account} = req.body;
  
    const eth =await Eth.findOne({metaId:account});
    if(eth!==null){
        res.status(200).json({message:"login successfuly"})
    }
    else{
        await Eth.create({metaId:account});
        res.status(202).json({message:"login successfully"})
    }
}

export const updateMetaUser = async(req,res)=>{
    const {name,age,metaId,gender,mobile} = req.body;
    console.log(req.body)
    const eth =await Eth.findOne({metaId});

    if(eth){
        await Eth.updateOne({metaId},{name,age,gender,mobile});
        res.status(200).json({message:"Information Updated successfully!"})
    }
    
}

export const getMetaUserDetails = async(req,res)=>{
    const {metaId} = req.body;

    try {
        const metaUser = await Eth.findOne({metaId});
        res.status(200).json({metaUser})
        
    } catch (error) {
        console.log(error)
    }
}
const sendResetEmail = (name, email, token) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "private.naukri.ashish@gmail.com",
        pass: "wnjsiiqnqcvjhkod",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const message = `
    <html lang="en">
  <body style='font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;' >
    <div class="container" style=' max-width: 800px;
        margin: 0 auto;'>
      <h1>${name}</h1>
      <div class="message" style="margin-bottom: 1rem;">
       
  <a 
   href='http://localhost:3001/resetpassword?token=${token}'
   class="button-30"
   style="font-size: 18px;text-align:'center';">Reset Password</a>
      </div>
      <div class="contact" style='margin-top: 1rem;
        font-style: italic;'>
        <p>If you have any questions or concerns, please visit our website or contact us directly.</p>
      </div>
      <div class="disclaimer" style="margin-top: 2rem;
        font-size: 14px;
        color: #999;">
        <p>Please do not reply to this email. This message is automatically generated and the mailbox is not monitored. If you have any questions or concerns, please visit our website or contact us directly. Thank you for your understanding.</p>
      </div>
    </div>
  </body>
  </html>
    `;
  
    const mailOptions = {
      from: "private.naukri.ashish@gmail.com",
      to: email,
      subject: "Reset Password",
      html: message,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  };

export const forgetPassword = async (req, res) => {
    //! checking if the username exists
    const { email } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404).json({ message: "Email not found !" });
    } else {
      const name = user.name;
      const email = user.email;
      const token = jwt.sign(
        {
          name,
          email,
        },
        "ashish123"
      );
      await Token.create({ email: user.email, token });
      sendResetEmail(name, email, token);
      res
        .status(200)
        .json({ message: "Please Check your email for password reset" });
    }
  };

  export const resetPassword = async (req, res) => {
    try {
      const { password, token } = req.body;
      console.log(password)
  
      const user = await Token.findOne({ token });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password, salt);
  
        await User.updateOne(
          { email: user.email },
          { password: hashedPassword }
        );
        await Token.deleteOne({ token });
        res.status(200).json({ message: "Password changed successfully." });
      } else {
        res.status(500).json({ message: "Invalid Request" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  