const mongoose = require("mongoose");

const awsConfigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "randomUser",
  },
  config:[{
     
     service: {
       type: String,
       required: true,
     },
     os: {
       type: String,
       required: true,
     },
     vcpu: {
       type: String,
       required: true,
     },
     ram: {
       type: String,
       required: true,
     },
     storage: {
       type: Number,
       required: true,
     },
    instance:{
     type:String,
     required:true,
    },
    region:{
     type:String,
     required:true,
    },
    days:{
     type:Number,
     required:true,
    },
    hours:{
     type:Number,
     required:true,
    },
    users:{
     type:Number,
     required:true,
    },
   
  }]},{timestamps:true});

const awsConfigModel = mongoose.model("awsConfigSchema", awsConfigSchema);

module.exports = awsConfigModel;

