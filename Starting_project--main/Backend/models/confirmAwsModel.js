const mongoose = require('mongoose')

const confirmAwsSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:true,
    },
    serviceAws:[
        {
            service:{
                type:String,
                required:true
            },
            id:{
                type:String,
                required:true,
            }
        }
    ],
    users:{
        type:String,
        // required:true,
    },
    days:{
        type:String,
        // required:true,
    },
    hours:{
        type:String,
        // required:true,
    },
    // date:{
    //     type:Date,
    //     default:Date.now
    // },

},{timestamps:true})
const confirmAwsModel = mongoose.model("confirmAwsSchema",confirmAwsSchema);
module.exports = confirmAwsModel;