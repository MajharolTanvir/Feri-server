const express = require('express');
const app = express()
const cors = require('cors')
const fileUpload = require("express-fileupload");

// middeleware 
app.use(cors())
app.use(express.json())
app.use(fileUpload());
app.use(express.static("public"));

// All Routes here
const productRouter = require("./Router/productRoute")
app.use("/api/v1/product" , productRouter)



app.use('/' , (req , res)=>{
      res.send("hellw world")
})

// error hendeler here 
// app.use()


module.exports = app