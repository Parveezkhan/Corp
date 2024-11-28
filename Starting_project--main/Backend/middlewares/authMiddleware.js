const randomUser = require('../models/authModel')

//jsonwebtokens
const JWT = require('jsonwebtoken')


const requireSignIn = async(req,res,next)=>{
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.SECRET_KEY)
        req.user=decode;
        next();
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {requireSignIn}