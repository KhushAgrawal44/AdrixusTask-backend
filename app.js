const express=require("express");
const mongoose = require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors");
require('dotenv').config()
const cookieParser=require("cookie-parser");


const userAuthRoutes=require("./routes/userAuth")



const app=express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    
    useUnifiedTopology:true
}).then(()=>console.log("DB connected"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api",userAuthRoutes);



const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})