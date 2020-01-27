const router= require("express").Router()
const db= require("./db")

router.get("/:id",(req,res)=>{
    let q=`SELECT vacation_id FROM followers WHERE vacation_id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
            res.json(result.length)
        }
    })
})

router.delete("/:username/:id",(req,res)=>{
    let q=`DELETE from followers WHERE username="${req.params.username}" and vacation_id="${req.params.id}"`
    console.log(q);
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
            res.sendStatus(200)
        }
    })
})
// delete from followers table and from vacations tabl, this is for followers table:
router.delete("/:id",(req,res)=>{
    let q=`DELETE FROM followers WHERE vacation_id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if (err){
            res.sendStatus(404)
            throw err
        }else{
            res.sendStatus(200)
        }
    })
})

router.get("/:username/:id",(req,res)=>{
    let q=`SELECT username FROM followers WHERE username="${req.params.username}" and vacation_id="${req.params.id}"`
   
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
           
            res.json(result.length)
        }
    })
})





router.post("/:username/:id",(req,res)=>{
    let q= `INSERT INTO followers(username,vacation_id) 
    VALUES("${req.params.username}","${req.params.id}")`
    console.log(q);
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
            res.sendStatus(200)
        }
    })
})

router.get("/",(req,res)=>{
    let q=`SELECT vacations.desteny, count(followers.username) as followers from vacations
    left join followers on vacations.id=followers.vacation_id
    group by vacations.id`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            console.log(result);
            res.json(result)
        }
    })
})







module.exports= router