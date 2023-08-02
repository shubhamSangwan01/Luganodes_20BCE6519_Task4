

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    max:200,
    required: true
  },
  age: {
    type: String,
    
  },
  gender: {
    type: String,
    
  },
  mobile: {
    type: String,
   
  },
  updated:{
    type:Boolean,
    default:false
  }
  ,
 
});

const User = mongoose.model('User', UserSchema);
export default User