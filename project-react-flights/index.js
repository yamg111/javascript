const express= require("express")
const app= express()
const cors= require("cors")
const users= require("./users")
const vacations=require("./vacations")
const followers=require("./followers")

app.use(cors({credentials:true,origin:"http://localhost:3001"}))
app.use(express.json())





// *****************build
app.use(express.static("build"))  
app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
})


app.use("/users",users)
app.use("/vacations",vacations)
app.use("/followers",followers)
app.listen(3000,console.log("let's start"))