const jwt = require("jsonwebtoken");

const authentication=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        res.send("please login")
    }
    console.log(token)
    
    res.send("hi")
}

module.exports={authentication}