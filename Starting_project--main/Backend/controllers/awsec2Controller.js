const awsEC2Model = require("../models/awsModel");
const awsConfigModel = require("../models/awsConfigModel");
const confirmAwsModel = require('../models/confirmAwsModel')

const awsEC2Get = async (req, res) => {
  try{
    const {service}=req.body;
    const getInstance = await awsEC2Model.find({Service:service});
    if(!getInstance){
      return res.status(201).send({
        success:false,
        message:"Could not access the service details"
      })
    }
    return res.status(200).send({ 
      success:true,
      message:"Successfully accessed the service details",
      getInstance,
    });
  }
  catch(error){
    return res.status(500).send({
      success:false,
      message:"Error in accessing service details",
      error,
    })
  }
  
};
const awsGetConfigs = async (req,res) =>{


  try{
    const configs = await awsConfigModel.find({});
    if(!configs){
      return res.send({
        success:false,
        message:"Could not fetch configurations"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Accessed Successfully",
      configs,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Could not access the configurations",
      error,
    })
  }

}
const awsGetConfigOnId = async (req,res) =>{
  
  try{
    const {adminId} = req.body;
    const configs = await confirmAwsModel.find({adminId:adminId});
    if(!configs){
      return res.send({
        success:false,
        message:"Could not fetch configurations"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Accessed Successfully",
      configs,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Could not access the configurations",
      error,
    })
  }
}
const awsSingleInstance = async (req,res) =>{

  try{
    const {service,memory,vcpu} = req.body;
    console.log(service,memory,vcpu)
    const getSingle = await awsEC2Model.findOne({
      Service:service,
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

const awsConfigArray = async (req,res)=>{
  try{
    const {ids}=req.body;
    if(!ids) res.send('Ids are required')
    const data = await awsConfigModel.find({'_id':{$in:ids}})
    if(!data){
      return res.status(201).send({
        success:false,
        message:"Ids are invalid",
      })
    }
    return res.status(200).send({
      success:true,
      message:"Successfully accessed",
      data,
    })
  }
  catch(error){
    return res.send({
      success:false,
      message:"Could not access the data",
      error,
    })
  }
}

const awsEC2config = async (req, res) => {
  console.log('connecting')
  try {
    const { service, os, vcpu, ram,storage, instance,region ,userId,catalog} = req.body;
    console.log(catalog)
    if (!service) return res.send({ message: "Service is required.." });
    if (!os) return res.send({ message: "os is required.." });
    if (!vcpu) return res.send({ message: "vcpu is required.." });
    if (!ram) return res.send({ message: "ram is required.." });
    if (!storage) return res.send({ message: "Storage is required.." });
    if (!instance) return res.send({ message: "Instance is required.." });
    if (!region) return res.send({ message: "Region is required.." });
    // if (!days) return res.send({ message: "Days is required.." });
    // if (!hours) return res.send({ message: "Hours is required.." });
    // if (!users) return res.send({ message: "Users is required.." });
    if(!userId) return res.send({message:"userId is required.."})

    const config = await new awsConfigModel({
         userId,
          service,
          os,
          vcpu,
          ram,
          storage,
          instance,
          region,
          // days,
          // hours,
          // users,
  }).save();
  // const config = await new awsConfigModel({userId:userId,config:catalog}).save();
  console.log(config)
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
      const {service, os, vcpu, ram,storage, instance,region,days,hours,users ,userId
      } = req.body

        const id =req.params['id'];

    if (!service) return res.send({ message: "Service is required.." });
    if (!os) return res.send({ message: "os is required.." });
    if (!vcpu) return res.send({ message: "vcpu is required.." });
    if (!ram) return res.send({ message: "ram is required.." });
    if (!storage) return res.send({ message: "Storage is required.." });
    if (!instance) return res.send({ message: "Instance is required.." });
    if (!region) return res.send({ message: "Region is required.." });
    if (!days) return res.send({ message: "Days is required.." });
    if (!hours) return res.send({ message: "Hours is required.." });
    if (!users) return res.send({ message: "Users is required.." });
    if(!userId) return res.send({message:"userId is required.."})
  
    const update = await awsConfigModel.findByIdAndUpdate({_id:id},
      {
      service,
      os,
      vcpu,
      ram,
      storage,
      instance,
      region,
      days,
      hours,
      users,
      userId,
    });
    

    if(!update){
      res.send({
        success:false,
        message:"The document is not being updated.."
      })
    }
    res.status(200).send({
      success:true,
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
    
    console.log(id)
    const deleteResult  = await awsConfigModel.findByIdAndDelete({_id:id});
    if(!res){
      return res.send({
        success:false,
        message:'The instance id is not matched..'
      })
    }
    return res.status(200).send({
      success:true,
      message:"The document deleted successfully..",
      deleteResult,
    })
  }
  
  catch(error){
      return res.status(500).send({
        success:false,
        message:"The document cannot be deleted",
        error,
       })
  }
}

const confirmawsmodel = async(req,res)=>{
  try {
    const { catalogContainer,users,days,hours ,catalogName} = req.body;
  
    // Check if catalog exists and return early if not
    if (!catalogContainer) {
      return res.status(400).send("Catalog is required"); // Added return to stop further execution
    }
    // Create the catalog
    const createCatalog = await new confirmAwsModel({
      adminId: catalogContainer.userId,
      serviceAws: catalogContainer.serviceAws,
      users:users,
      days:days,
      hours:hours,
      catalogName:catalogName,
    }).save();
  
    // If the catalog is not created successfully
    if (!createCatalog) {
      return res.status(500).send({
        success: false,
        message: "The catalog is not created",
      });
    }
  
    // If the catalog is created successfully
    return res.status(200).send({
      success: true,
      message: "Successfully catalog added",
      createCatalog,
    });
  } catch (error) {
    // Handle any error that occurs during the process
    return res.status(500).send({
      success: false,
      message: "Could not store document",
      error: error.message || error,
    });
  }
  
}

const getConfirmModelOnId = async(req,res)=>{
  try{
    const Id = req.params['id']
    const getCatalogs = await confirmAwsModel.findOne({_id:Id})
  
    if(!getCatalogs){
      return res.send({
        success:false,
        message:"Id is invalid",
      })
    }
    return res.status(200).send({
      success:true,
      message:"Successfully accessed catalogs",
      getCatalogs,
    })
  }
  catch(error){
    return res.status(500).send({
      success:false,
      message:"Could not get awscatlog",
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
  awsGetConfigs,
  awsGetConfigOnId,
  confirmawsmodel,
  getConfirmModelOnId,
  awsConfigArray,
 };
