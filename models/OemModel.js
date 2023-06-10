const mongoose=require("mongoose")


const oemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    year:{type:Number,required},
    price:{type:Number,required},
    colour:{type:Array,required},
    milage:{type:Number,required},
    power:{type:Number,required},
    max_speed:{type:Number,required}
})

const oemModel=mongoose.maodel("oem",oemSchema)

module.exports={oemModel}