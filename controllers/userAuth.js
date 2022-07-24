const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const {errorHandler} =require("../helpers/dbErrorHandler")

exports.signup=(req,res)=>{
    console.log(req.body);
    const user = new User(req.body)
    user.save((error,user)=>{
        if(error)
        {
            return res.status(400).json({
                error:errorHandler(error)
            });
        }
        else
        {
           user.salt=undefined
           user.hashed_password=undefined
           res.json({user})
        }
    }) 
 }

 exports.signin=(req,res)=>{
    const {email,password}=req.body
    User.findOne({email},(err,loggedInMember)=>{
        if(err || !loggedInMember)
        {
            return res.status(400).json({
                error:"User with that email does not exist. Please SignUp"
            })
        }
        
        if(!loggedInMember.authenticate(password)){
            return res.status(401).json({
                error:"Email and password dont match"
            })
        }
       
        const token=jwt.sign({_id:loggedInMember._id},process.env.JWT_SECRET) 
       
        res.cookie("t",token,{expire:new Date() + 9999})
        
        const {_id,name,email,phoneNo}=loggedInMember
        return res.json({token,loggedInMember:{_id,email,name,phoneNo}})
    }) 
}