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
      success: true,
      message:"Successfully added..",
      config,
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

const awsEC2config_get = async(req,res)=>{
  try{
    const config_id = req.params['id'];
    if(!config_id) return res.send({message:"Id is required.."})
    
    const config = await awsConfigModel.findById({_id:config_id});

    if(!config){
      return res.status(201).send({
        success:false,
        message:"Id did not match"
      })
    }
    res.status(200).send({
      success:true,
      message:"The document is fetched successfully",
      config,
    })
  }
  catch(error){
    res.status(500).send({
      success:false,
      message:"Could not fetch the document..",
      error,
    })
  }
}

const awsEc2config_update = async (req,res)=>{
    try{
      const {service,
        os,
        vcpu,
        storage,
        ram,
        userId,
      } = req.body

        const id =req.params['id'];

        if (!service) return res.send({ message: "Service is required.." });
        if (!os) return res.send({ message: "os is required.." });
        if (!vcpu) return res.send({ message: "vcpu is required.." });
        if (!storage) return res.send({ message: "Storage is required.." });
        if (!ram) return res.send({ message: "Ram is required.." });
        if(!userId) return res.send({message:"userId is required.."})
        if(!id) return res.send({message:"Id is required.."})
  
    const update = await awsConfigModel.findByIdAndUpdate({_id:id},
      {
      service,
      os,
      vcpu,
      storage,
      ram,
      userId,
    });
    

    if(!update){
      res.send({
        success:false,
        message:"The document is not being updated.."
      })
    }
    res.status(200).send({
      success:false,
      message:"The document is updated successfully..",
      update
    })
  }
    catch(error){
      res.status(500).send({
        success:false,
        message:"Could not update the document",
        error,
      })
    }
}

const awsEC2config_delete = async(req,res)=>{
  try{
    
    const id = req.params['id'];
    if(!id) return res.send({message:"Id is required"})
    
    const res = await awsConfigModel.findByIdAndDelete({_id:id});
    if(!res){
      res.send({
        success:false,
        message:'The instance id is not matched..'
      })
    }
    res.status(200).send({
      success:true,
      message:"The document deleted successfully..",
      res
    })
  }
  
  catch(error){
       res.status(500).send({
        success:false,
        message:"The document cannot be deleted",
        error,
       })
  }
}

module.exports = { 
  awsEC2Get,
  awsEC2config,
  awsSingleInstance,
  awsEC2config_delete,
  awsEC2config_get,
  awsEc2config_update,
 };
