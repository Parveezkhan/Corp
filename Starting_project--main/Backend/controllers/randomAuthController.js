const randomUser = require("../models/authModel");
const autoUsers = require("../models/autoCreatedusers");
const { hashPassword, comparePassword } = require("../helper/authHelper");

//jsonwebtokens
const JWT = require("jsonwebtoken");
const autoUsersModel = require("../models/autoCreatedusers");

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

const autoCreateUsers = async (req, res) => {
  try {
    const { users } = req.body;
    if (!users) return res.send({ message: "Users are required.." });

    for (let i = 0; i < users.length; i++) {
      const pushUsers = await new autoUsers({
        userName: users[i].userName,
        password: users[i].password,
        adminId: users[i].adminId,
        catalogInstance:users[i].catalogInstance
      }).save();
    }

    return res.status(200).send({
      success: true,
      message: "Successfully saved users",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in saving users",
      error,
    });
  }
};

const autoEditUsers = async(req,res)=>{
  try{
    const {id , userName,password,adminId,catalogInstance,role}=req.body;
    if(!id)  res.send("Id is required..")
    if(!userName)  res.send('Username is required')
    if(!password)  res.send('password is required')
    if(!adminId)  res.send('adminId is required')
    if(!catalogInstance)  res.send('catalogInstance is required')
    if(!role)  res.send('role is required')   
      console.log(adminId)
    console.log( req.body)
    const updateAutoUser = await autoUsersModel.findByIdAndUpdate({_id:id},{
      userName,
      password,
      adminId,
      catalogInstance,
      role,
    })
    if(!updateAutoUser){
      return res.send({
        success:false,
        message:"Could not update"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Successfully updated user",
      updateAutoUser,
    })
  }
  catch(error){
    return res.status(500).send({
      success:false,
      message:"Could not update user",
      error,
    })
  }
}

const autoDeleteUsers =async (req,res)=>{
  try{
    const {userId} = req.body;
    if(!userId) return res.send("Userid is required")
    const deleteUser = await autoUsers.findByIdAndDelete({_id:userId});
    if(!deleteUser){
      return res.status(201).send({
        success:false,
        message:"Could not Remove",
        
      })
    }
    return res.status(200).send({
      success:true,
      message:"Successfully deleted",
      deleteUser,
    })

  }
  catch(error){
    return res.status(500).send({
      success:false,
      message:"Could not delete the user",
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
      const user1 = await autoUsers.findOne({
        userName: emailAddress,
        password: password,
      });
      if (!user1) {
        return res.send({
          success: false,
          message: "Invalid username or password found",
        });
      } else {
        const token = JWT.sign({ _id: user1._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        return res.status(200).send({
          success: true,
          message: "Login Successfull",
          user: {
            username: user1.userName,
          },
          token,
          role: user1.role,
        });
      }
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

    return res.status(200).send({
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
    return res.status(500).send({
      success: "false",
      message: "Error in Login",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { emailAddress } = req.body;
    if (!emailAddress) {
      return res.send({ message: "Required Email.." });
    }

    const user = await randomUser.findOne({ emailAddress });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "User not found",
      error,
    });
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const { adminId } = req.body;
    if (!adminId) {
      return res.send({
        success: false,
        message: "Admin ID is required..",
      });
    }
    const getUser = await autoUsers.find({ adminId: adminId });
    if (!getUser) {
      return res.send({
        success: false,
        message: "Invalid Admin Id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Users accessed successfully",
      getUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Could not find the user",
      error,
    });
  }
};

module.exports = {
  randomRegisterController,
  randomLoginController,
  getUser,
  autoCreateUsers,
  getAdminUsers,
  autoDeleteUsers,
  autoEditUsers,
};