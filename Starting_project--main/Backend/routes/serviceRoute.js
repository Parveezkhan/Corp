const express = require("express");
const { 
    awsEC2Get,
    awsEC2config,
    awsSingleInstance,
    awsEC2config_delete,
    awsEC2config_get,
    awsEc2config_update,
 } = require("../controllers/awsec2Controller");
 
//aws python file import
const router = express.Router();

//Python aws script
const { PythonShell } = require('python-shell');
const { exec } = require('child_process')
const {spawn} = require('child_process')

router.get("/get-awsec2", awsEC2Get);
router.post('/get-singleec2',awsSingleInstance)
router.post('/awsconfig',awsEC2config);
router.post("/awsconfig_get/:id",awsEC2config_get);
router.post("/awsEc2config_update/:id",awsEc2config_update);
router.delete('/awsconfig_delete/:id',awsEC2config_delete);

router.post('/python/aws', (req,res)=>{
  const {services,users,days,hours} = req.body;
    let options = {
    mode: 'text',
    args:[
      services,
      users,
      days,
      hours,
    ],
  }
  PythonShell.run('aws_service_selector.py', null).then((message)=>{
    res.send({
      success:true,
      message:"Executed Successfully",
      message,
    })
    console.log("Finished executing")
  })
  .catch(error=>{
    res.send({
      success:false,
      message:"Error in Executing",
      error,
    })
  })
  })

// route to azure
router.get('/python/azure', (req,res)=>{
  const {services,users,days,hours} = req.body;
    let options = {
    mode: 'text',
    args:[
      services,
      users,
      days,
      hours,
    ],
  }
  PythonShell.run('azure_service_deployer.py', null).then((message)=>{
    res.send({
      success:true,
      message:"Executed Successfully"
    })
    console.log("Finished executing")
  })
  .catch(error=>{
    res.send({
      success:false,
      message:"Error in Executing",
      error,
    })
  })
  })




module.exports = router;
