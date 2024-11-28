const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
     emailAddress:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,
     },
     confirmPassword:{
        type:String,
     },
     purpose:{
        type:String,
     },
     role:{
        type:String,
        default:'user',
     }
},{timestamps:true});

const User=mongoose.model('randomUser',userSchema);

module.exports=User;