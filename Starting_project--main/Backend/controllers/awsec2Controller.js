const awsEC2Model = require("../models/awsModel");
const awsConfigModel = require("../models/awsConfigModel");

const awsEC2Get = async (req, res) => {
  const getInstance = await awsEC2Model.find({});
  res.send({ getInstance });
};
const awsSingleInstance = async (req,res) =>{

  try{
    const {memory,vcpu} = req.body;
    const getSingle = await awsEC2Model.findOne({
      memory:memory,
      vcpu:vcpu,
    })
    if(!getSingle){
      return res.send({
        success:false,
        message:"No Particular Instance Is Found..",
      })
    }
    return res.status(200).send({
      success:true,
      message:"Found the Instance..",
      getSingle,
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Getting Instance",
      error,
    });
  }
  
}

const awsEC2config = async (req, res) => {
  try {
    const { service, os, vcpu, storage, ram ,userId } = req.body;
    if (!service) return res.send({ message: "Service is required.." });
    if (!os) return res.send({ message: "os is required.." });
    if (!vcpu) return res.send({ message: "vcpu is required.." });
    if (!storage) return res.send({ message: "Storage is required.." });
    if (!ram) return res.send({ message: "Ram is required.." });
    if(!userId) return res.send({message:"userId is required.."})

    const config = await new awsConfigModel({
      service,
      os,
      vcpu,
      storage,
      ram,
      userId,
    }).save();
    res.status(201).send({
      message: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in storing awsec2 configurations",
      error,
    });
  }
};

module.exports = { 
  awsEC2Get,
  awsEC2config,
  awsSingleInstance,
 };
