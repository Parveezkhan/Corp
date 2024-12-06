const randomUser = require("../models/authModel");
const autoUsers = require("../models/autoCreatedusers");
const { hashPassword, comparePassword } = require("../helper/authHelper");

//jsonwebtokens
const JWT = require("jsonwebtoken");

const randomRegisterController = async (req, res) => {
  try {
    const { emailAddress, password, purpose } = req.body;
    if (!emailAddress) {
      return res.send({ message: "email is Required.." });
    }
    if (!password) {
      return res.send({ message: "password is Required.." });
    }

    if (!purpose) {
      return res.send({ message: "purpose is Required.." });
    }
    //existing user

    const existngUser = await randomUser.findOne({ emailAddress });
    if (existngUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please login..",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new randomUser({
      emailAddress,
      password: hashedPassword,
      purpose,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user: {
        purpose: user.purpose,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const autoCreateUsers = async(req,res)=>{
  try{
    const {generatedUsers} = req.body;
    console.log(generatedUsers)
  if(!generatedUsers) return res.send({message:"Users are required.."})
  
  const pushUsers = await  autoUsers.insertMany(generatedUsers);
  if(!pushUsers){
    return res.status(201).send({
      success:false,
      message:"Could not save the users",
    })
  }
  return res.status(200).send({
    success:true,
    message:"Successfully saved users",
    pushUsers,
  })
  }
  catch(error){
    return res.status(500).send({
      success:false,
      message:"Error in saving users",
      error,
    })
  }
}

const randomLoginController = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
      return res.send({
        success: true,
        message: "Invalid email or password",
      });
    }
    const user = await randomUser.findOne({ emailAddress });
    if (!user) {
      return res.send({
        success: false,
        message: "user not found",
      });
    }
    console.log(user);
    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfull",
      user: {
        emailAddress: user.emailAddress,
      },
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in Login",
      error,
    });
  }
};

const getUser = async(req,res)=>{
  try{
    const {emailAddress} = req.body;
    if(!emailAddress){
      res.send({message:"Required Email.."})
    }
    
    const user = await randomUser.findOne({emailAddress});

    res.status(201).send({
      success:true,
      message:"User found",
      user,
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "User not found",
      error,
    });
  }
  }


module.exports = {
  randomRegisterController,
  randomLoginController,
  getUser,
  autoCreateUsers,
};
