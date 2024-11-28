require("dotenv").config();


const express = require('express');
const connectDB= require('./config/db')
const cors = require('cors');
const morgan=require('morgan');
const path = require('path');
const app=express();
 
//users routes
const userRoute=require('./routes/authRoute.js')

//database connection
connectDB()

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./Client")));

//Users route
app.use('/api/auth',userRoute);

//rest api
app.use("*", function (req, res) {
    res.send("Server Connected..");
  });
  


//PORT
const PORT = 5000;

app.listen(PORT,
    console.log(`Server Started at ${PORT}`)
)