const awsEC2Model = require("../models/awsModel");
const awsConfigModel = require("../models/awsConfigModel");

const awsEC2Get = async (req, res) => {
  const getInstance = await awsEC2Model.find({});
  res.send({ getInstance });
};

const awsEC2config = async (req, res) => {
  try {
    const { service, os, vcpu, storage, ram } = req.body;
    if (!service) return res.send({ message: "Service is required.." });
    if (!os) return res.send({ message: "os is required.." });
    if (!vcpu) return res.send({ message: "vcpu is required.." });
    if (!storage) return res.send({ message: "Storage is required.." });
    if (!ram) return res.send({ message: "Ram is required.." });

    const config = await new awsConfigModel({
      service,
      os,
      vcpu,
      storage,
      ram,
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

module.exports = { awsEC2Get };
