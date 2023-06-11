const mongoose=require("mongoose")


const marketSchema=new mongoose.Schema({
    distance_covered:{type:Number,required:true},
    scratches:{type:Number,required:true},
    paint:{type:String,required:true},
    no_of_accidents:{type:Number,required:true},
    name_previous_buyer:{type:String,required:true},
    registration_place:{type:String,required:true},
    oem_id:{type:String,required:true},
    secondhand_price:{type:Number,required:true}
})

const marketModel=mongoose.model("market",marketSchema)

module.exports={marketModel}