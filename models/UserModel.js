const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true},
    user_type:{type:String,required:true},
})

const UserModel=mongoose.model("user",userSchema)


module.exports={UserModel}