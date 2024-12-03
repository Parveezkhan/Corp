const express = require("express");
const { 
    awsEC2Get,
    awsEC2config,
    awsSingleInstance,
    awsEC2config_delete,
 } = require("../controllers/awsec2Controller");
 
//aws python file import
const router = express.Router();

//Python aws script
const { PythonShell } = require('python-shell');

router.get("/get-awsec2", awsEC2Get);
router.post('/get-singleec2',awsSingleInstance)
router.post('/awsconfig',awsEC2config);
router.post('/awsconfig_delete',awsEC2config_delete);
router.get('/python', (req,res)=>{
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
  PythonShell.run('aws_service_selector.py', options).then((message)=>{
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
