

import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  token:String,
  email: {
    type: String,
   
  }
});

const Token = mongoose.model('Token',TokenSchema);
export default Token