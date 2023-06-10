const express = require("express");
const { UserModel } = require("../models/UserModel");
const registerRouter=express.Router()

registerRouter.get("/",(req,res)=>{
    res.send("welcome to register route")
})

registerRouter.post("/add-user",async (req,res)=>{

    let {name,email,password,mobile,user_type}=req.body
    const isUser = await UserModel.findOne({email})

    if(isUser){
        res.send({"msg" : "User already exists"})
    }
    else {
        const new_user=new UserModel({
            name,
            email,
            password,
            mobile,
            user_type
        })
        try{
            await new_user.save()
            res.send({"msg" : "User regester successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }
}
})

module.exports={registerRouter}