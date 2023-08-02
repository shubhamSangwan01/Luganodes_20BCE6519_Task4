

import mongoose from 'mongoose'

const EthSchema = new mongoose.Schema({
  metaId:String,
  name: {
    type: String,
   
  },
  age: {
    type: String,
    
  },
  gender: {
    type: String,
    
  },
  mobile: {
    type: String,
   
  }

});

const Eth = mongoose.model('Eth',EthSchema);
export default Eth