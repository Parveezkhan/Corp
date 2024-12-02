const express = require("express");
const { 
    awsEC2Get,
    awsEC2config,
    awsSingleInstance,
 } = require("../controllers/awsec2Controller");

const router = express.Router();

router.get("/get-awsec2", awsEC2Get);
router.post('/get-singleec2',awsSingleInstance)
router.post('/awsconfig',awsEC2config);

module.exports = router;
