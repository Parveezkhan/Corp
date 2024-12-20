const mongoose = require('mongoose');

const autoUsers = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "randomUser",
    },
    catalogInstance:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
        required:true,
    },
},{timestamps:true})

const autoUsersModel = new mongoose.model('autoUsers',autoUsers);

module.exports = autoUsersModel