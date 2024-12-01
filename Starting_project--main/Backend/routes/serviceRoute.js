const express = require("express");
const { awsEC2Get } = require("../controllers/awsec2Controller");

const router = express.Router();

router.get("/get-awsec2", awsEC2Get);

module.exports = router;
