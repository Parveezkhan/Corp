const mongoose = require("mongoose");

const awsConfigSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  vcpu: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  ram: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "randomUser",
  },
});

const awsConfigModel = mongoose.model("awsConfigSchema", awsConfigSchema);

module.exports = awsConfigModel;
