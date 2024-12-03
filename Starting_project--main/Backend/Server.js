require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const {PythonShell} =require('python-shell');

//users routes
const userRoute = require("./routes/authRoute.js");
const serviceRoute = require("./routes/serviceRoute.js");



//database connection
connectDB();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, "./Client")));

//Users route
app.use("/api/auth", userRoute);

//Service route
app.use("/api/services", serviceRoute);

//rest api
app.use("*", function (req, res) {
  res.send("Server Connected..");
});

// PythonShell.run('aws_service_selector.py',null).then(message=>{
//   console.log(message);
// })


//PORT
const PORT = 5000;

app.listen(PORT, console.log(`Server Started at ${PORT}`));
