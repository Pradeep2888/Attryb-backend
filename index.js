const express = require("express")
const { registerRouter } = require("./routes/register.route");
const { loginRouter } = require("./routes/login.route");
const cors = require("cors");
const { connection } = require("./config/db");


const app = express();
app.use(cors()) 

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to api")
})

app.use("/register",registerRouter)
app.use("/login",loginRouter)







app.listen(8080, async () => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log(err)
        console.log("Error connecting to DB")
    }
    console.log(`Listening on PORT 8080`)
})
