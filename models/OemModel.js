const mongoose=require("mongoose")


const oemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    year:{type:Number,required:true},
    price:{type:Number,required:true},
    colour:{type:Array,required:true},
    milage:{type:Number,required:true},
    power:{type:Number,required:true},
    max_speed:{type:Number,required:true}
})

const oemModel=mongoose.model("oem",oemSchema)

module.exports={oemModel}