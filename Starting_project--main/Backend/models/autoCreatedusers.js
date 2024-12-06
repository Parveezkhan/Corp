const mongoose = require('mongoose');

const autoUsers = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "randomUser",
    }
},{timestamps:true})

const autoUsersModel = new mongoose.model('autoUsers',autoUsers);

module.exports = autoUsersModel