const mongoose = require('mongoose')

const awsEC2Schema = new mongoose.Schema({
     instanceName:{
        type:String,
        required:true,
     },
     memory:{
        type:String,
        required:true,
     },
     vcpu:{
        type:String,
        required:true,
     },
     Storage:{
        type:String,
        required:true,
     },
     networkPerformance:{
        type:String,
     }
     ,
     onDemand_Windows_base_pricing:{
        type:String
    },
    onDemand_Ubuntu_Pro_base_pricing:{
        type:String
    },
    onDemand_Suse_base_pricing:{
        type:String
    },
    onDemand_Rhel_base_pricing:{
        type:String
    },
    onDemand_Linux_base_pricing:{
        type:String
    },
    

},{timestamps:true})

const awsEC2Model = mongoose.model('awsEC2Schema',awsEC2Schema);

module.exports = awsEC2Model;