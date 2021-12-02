const mongoose = require('mongoose')
const moment = require("moment"); 

const drschema = new mongoose.Schema({
  division: {
    type: String,
  },
  rbm_name: {
    type: String,
  },
  mobile: {
    type: String
  },
  abm_name: {
    type: String,
  },
  bo_name: {
    type: String,
  },
  hq_name: {
    type: String,
  },
  doctor_name: {
    type: String,
  },
  hospital_name: {
    type: String,
    // required:true
  },
  hospital_address: {
    type: String,
    // required:true
  },
  city: {
    type: String,
    // required:true
  },
  language: {
    type: String,
    // required:true
  },
  image: {
    type: String,
    default: "1623500614869.png",
  },
  croped_file: {
    type: String,
    default: "",
  },
}, {
  timestamps:  { currentTime: () => moment(new Date()).utcOffset('+05:30').format("YYYY-MM-DD[T]HH:mm:ss") },
  versionKey: false
});
module.exports = mongoose.model('Doctor', drschema)