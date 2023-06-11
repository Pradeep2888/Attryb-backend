const mongoose=require("mongoose")


const marketSchema=new mongoose.Schema({
    distance_covered:{type:Number,required:true},
    scratches:{type:Number,required},
    paint:{type:String,required},
    no_of_accidents:{type:Number,required},
    name_previous_buyer:{type:String,required},
    registration_place:{type:String,required},
    oem_id:{type:String,required},
    secondhand_price:{type:Number,required}
})

const marketModel=mongoose.maodel("market",marketSchema)

module.exports={marketModel}