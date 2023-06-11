const express=require("express")
const { oemModel } = require("../models/OemModel")
const oemRouter=express.Router()

oemRouter.get("/",async(req,res)=>{
    const data=await oemModel.find()
    res.send({"oem":data})
})

oemRouter.post("/add",async(req,res)=>{
    let {name,year,price,colour,milage,power,max_speed}=req.body
    const isCar = await oemModel.findOne({name})
    const isYear = await oemModel.findOne({year})

    if(isCar && isYear){
        res.send({"msg" : "Car already exists"})
    }
    else {
        const new_oem=new oemModel({
            name,
            year,
            price,
            colour,
            milage,
            power,
            max_speed
        })
        try{
            await new_oem.save()
            res.send({"msg" : "Car OEM added successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }
}
})

module.exports={oemRouter}