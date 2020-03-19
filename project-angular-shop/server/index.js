const express= require("express")
const app= express()
const cors= require("cors")
const users= require("./users")
const items= require("./items")
const carts= require("./carts")
const orders= require("./orders")

app.use(cors())
app.use(express.json())







app.use("/users",users)
app.use("/items",items)
app.use("/carts",carts)
app.use("/orders",orders)
app.listen(3000,console.log("let's start"))