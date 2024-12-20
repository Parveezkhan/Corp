const express = require("express");
const {
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

 } = require("../controllers/awsec2Controller");
 
//aws python file import
const router = express.Router();

//Python aws script
const { PythonShell } = require('python-shell');
const { exec } = require('child_process')
const {spawn} = require('child_process')

router.post("/get-awsec2", awsEC2Get);
router.post('/get-singleec2',awsSingleInstance)
router.post('/awsconfig',awsEC2config);
router.post("/awsconfig_get",awsEC2config_get);
router.post("/awsEc2config_update/:id",awsEc2config_update);
router.delete('/awsconfig_delete/:id',awsEC2config_delete);
router.get('/get_awsConfig',awsGetConfigs);
router.post('/get_awsConfigOnId',awsGetConfigOnId);
router.post('/awsconfirm_model',confirmawsmodel);
router.get('/awsCatalog/:id',getConfirmModelOnId)
router.post('/awsConfigArray',awsConfigArray)

router.post('/python/aws', (req, res) => {
  const {services,users,days,hours} = req.body;
  const args = [services,users,days,hours];
  console.log(services)
  const pythonProcess = spawn('python', ['aws_service_selector.py',...args]);

  // Capture the output of the Python script
  pythonProcess.stdout.on('data', (data) => {
    let result=data.toString();
      console.log(`stdout: ${result}`);
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });
 // Immediately respond to the  request
  res.json({ message: 'Python script is running in the background.' });

  pythonProcess.on('close', (code) => {
      console.log(`Aws process exited with code ${code}`);
      res.send("Aws script has finished executing.");
  });

  //  Set a timeout for the process (e.g., 30 seconds)
//    setTimeout(() => {
//     pythonProcess.kill();
//     res.status(500).send({ error: 'Python script execution timed out.' });
// }, 30000); 

});

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
  PythonShell.run('aws_service_selector.py', null).then((message)=>{
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
