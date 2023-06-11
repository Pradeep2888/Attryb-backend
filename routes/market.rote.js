const express=require("express")
const { marketModel } = require("../models/marketModel")
const { oemModel } = require("../models/OemModel")
const marketRouter=express.Router()


marketRouter.get("/",async(req,res)=>{   
    const data=await marketModel.find()
    let arr=[]

    for(let i=0;i<data.length;i++){
        let oemid=data[i].oem_id
        const oem_data= await oemModel.findOne({_id:oemid})
        const {_id,distance_covered,scratches,paint,no_of_accidents,name_previous_buyer,registration_place,secondhand_price}=data[i]
        const {name,year,price,colour,milage,power,max_speed}=oem_data
        const obj={distance_covered,
            _id,
            oemid,
            scratches,
            paint,
            no_of_accidents,
            name_previous_buyer,
            registration_place,
            secondhand_price,
            name,year,
            price,
            colour,
            milage,
            power,
            max_speed
        }
        arr.push(obj)
    }

    res.send({"market_car":arr})
})

marketRouter.post("/add/:oemid",async(req,res)=>{
    let {oemid}=req.params
    let {distance_covered,scratches,paint,no_of_accidents,name_previous_buyer,registration_place,oem_id,secondhand_price}=req.body

        const new_market_car=new marketModel({
            distance_covered,
            scratches,
            paint,
            no_of_accidents,
            name_previous_buyer,
            registration_place,
            oem_id:oemid,
            secondhand_price
        })
        try{
            await new_market_car.save()
            res.send({"msg" : "Car added successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }

})

marketRouter.delete("/delete/:id",async(req,res)=>{
  
    const {id}=req.params
  
    const data=await marketModel.findOne({_id:id})
    if(data){
        await marketModel.deleteOne({_id:id})
        res.send({"msg":"car is deleted"})
    }
    else{
        res.send({"msg":"car not exist more"})   
    }
   
})




marketRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    let {distance_covered,scratches,paint,no_of_accidents,name_previous_buyer,registration_place,oem_id,secondhand_price}=req.body
     try{
         const updated= await marketModel.findByIdAndUpdate({_id:id},{"$set":{distance_covered,scratches,paint,no_of_accidents,name_previous_buyer,registration_place,oem_id,secondhand_price}})
         res.send("update successfully")
      }
      catch(err){
          console.log(err)
          res.send("update not successfully")
      }
})




module.exports={marketRouter}