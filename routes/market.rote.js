const express=require("express")
const { marketModel } = require("../models/marketModel")
const { oemModel } = require("../models/OemModel")
const marketRouter=express.Router()


marketRouter.get("/",async(req,res)=>{   
    const query=req.query
    var data
    if(query.colour===""){   
        data=await marketModel.find()
    }
    else{
        data=await marketModel.find({paint:query.colour.toLowerCase()})
    }
    let arr=[]

    for(let i=0;i<data.length;i++){
        let oemid=data[i].oem_id
        const oem_data= await oemModel.findOne({_id:oemid})
        const {_id,distance_covered,discription,scratches,paint,image_url,no_of_accidents,no_previous_buyer,registration_place,secondhand_price}=data[i]
        const {name,year,price,colour,milage,power,max_speed}=oem_data
        const obj={
            distance_covered,
            _id,
            oemid,
            image_url,
            scratches,
            paint,
            no_of_accidents,
            no_previous_buyer,
            registration_place,
            secondhand_price,
            name,year,
            price,
            colour,
            milage,
            power,
            discription,
            max_speed
        }
        arr.push(obj)
    }

    if(Number(query.price)===-1){
        arr.sort((a,b)=>{
            return b.price-a.price
        })
    }
    else if(Number(query.price)===1){
        arr.sort((a,b)=>{
            return a.price-b.price
        })
    }
    if(query.milage==="0-10"){
        let a=0
        let b=10
        arr=getData(a,b,arr)
    }
    else if(query.milage==="10-20"){
        let a=11
        let b=20
        arr=getData(a,b,arr)
    }
    else if(query.milage==="21ormore"){
        let a=21
        let b=1000000000
        arr=getData(a,b,arr)
    }
 
    res.send({"market_car":arr})
})

const getData=(a,b,arr)=>{
 let arr1=[]
  for(let i=0;i<arr.length;i++){
    if(arr[i].milage>=a && arr[i].milage<=b){
        arr1.push(arr[i])
    }
  }
  return arr1
}

marketRouter.post("/add/:oemid",async(req,res)=>{
    let {oemid}=req.params
    let {distance_covered,image_url,discription,scratches,paint,no_of_accidents,no_previous_buyer,registration_place,oem_id,secondhand_price}=req.body

        const new_market_car=new marketModel({
            distance_covered,
            scratches,
            paint,
            image_url,
            no_of_accidents,
            no_previous_buyer,
            registration_place,
            oem_id:oemid,
            discription,
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
    let {distance_covered,image_url,scratches,discription,paint,no_of_accidents,no_previous_buyer,registration_place,oem_id,secondhand_price}=req.body
     try{
         const updated= await marketModel.findByIdAndUpdate({_id:id},{"$set":{distance_covered,discription,image_url,scratches,paint,no_of_accidents,no_previous_buyer,registration_place,oem_id,secondhand_price}})
         res.send("update successfully")
      }
      catch(err){
          console.log(err)
          res.send("update not successfully")
      }
})




module.exports={marketRouter}