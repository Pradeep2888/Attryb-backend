const express = require("express");
const { UserModel } = require("../models/UserModel");
const loginRouter=express.Router()
const jwt=require("jsonwebtoken")


loginRouter.get("/",async(req,res)=>{
    const users=await UserModel.find()
    res.send({"data":users})
})




loginRouter.post("/user",async (req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email,password})
    if(!user){
        res.send({"msg":"please write registerd mail address"})
    }
    else{

    const user_detail={
        user_id:user._id,
        user_type:user.user_type
    }
  
        if(password!==user.password){
            res.send({"msg":"password incorrect"})
        }
        else if(password===user.password){
            const token=jwt.sign({user_detail},"ABCD12345XYZ");
            res.send({"mesg":"Login sucessfull","token":token})
        }
        else{
            res.send({"msg":"Login faild"})
        }
    }
})









module.exports={loginRouter}