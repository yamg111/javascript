const mysql= require("mysql")
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    database : "store_db"
})

db.connect(err=>{
    if (err) throw err 
    console.log("connected to mysql");
})

module.exports= db