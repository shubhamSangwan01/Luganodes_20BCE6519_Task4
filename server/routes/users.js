import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken'
import {view,createUser,loginUser,addUserDetails,updateUserDetails, addMetaUser, updateMetaUser, getMetaUserDetails} from '../controllers/users.js'


const verifyToken = (req, res, next) => {
    const token =req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token,"secret123");
      req.email = decoded.email;
     
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };


router.get('/view',verifyToken,view)

router.post('/register',createUser)
router.post('/login',loginUser)
router.post('/addUserDetails',verifyToken,addUserDetails)
router.post('/eth',addMetaUser)
router.post('/getMetaUser',getMetaUserDetails)
router.post('/updateMetaUser',updateMetaUser)
router.patch('/update',verifyToken,updateUserDetails)


export default router