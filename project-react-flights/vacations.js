const router= require("express").Router()
const db= require("./db")
let uuid=require("uuid")

router.get("/username/:username",(req,res)=>{
    let q = `select vacations.id, vacations.desteny, vacations.description, vacations.picture, vacations.start, vacations.ends, vacations.price, vacations.added from vacations,followers where vacations.id = followers.vacation_id and followers.username = "${req.params.username}"
               union 
               select vacations.id, vacations.desteny, vacations.description, vacations.picture, vacations.start, vacations.ends, vacations.price, vacations.added from vacations, followers where followers.username = "${req.params.username}" and vacations.id <> followers.vacation_id`
        db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(401)
            throw err
        }else if(result.length>0){
          res.json(result)
       
                }else{
                    q= `SELECT * FROM vacations `
                    db.query(q,(err,result)=>{
                        if (err){
                            res.sendStatus(401)
                            throw err 
                        }else{
                            res.json(result)
                    
                        }
                })
            
        }
    })
})

router.get("/id/:id",(req,res)=>{
    let q= `SELECT * FROM vacations WHERE vacations.id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(401)
            throw err
        }else{
            res.json(result[0])
        }
    })
})

router.post("/",(req,res)=>{
    const id= uuid()
    let q= `INSERT INTO vacations (id, desteny, description, picture, start, ends, price) 
    VALUES("${id}","${req.body.desteny}","${req.body.description}","${req.body.picture}","${req.body.start}","${req.body.ends}",${req.body.price})`
    db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(404)
            throw err
        }else{
            let q= `SELECT * FROM vacations WHERE id="${id}"`
    db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(404)
            throw err
        }else{
            res.sendStatus(200)
        }
    })
        }
    })
})

router.put("/:id",(req,res)=>{
    let  q= `UPDATE vacations 
    SET desteny="${req.body.desteny}", description="${req.body.description}", picture="${req.body.picture}", start="${req.body.start}", ends="${req.body.ends}", price="${req.body.price}" WHERE id="${req.params.id}" `
    db.query(q,(err,result,fields)=>{
        if (err){
            res.sendStatus(404)
            throw err
        }  else{
            res.sendStatus(200)
        }
    })          
})

router.delete("/:id",(req,res)=>{
    let q=`DELETE FROM vacations WHERE id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(404)
            throw err
        }else{
            res.sendStatus(200)
        }
    })
})






module.exports= router