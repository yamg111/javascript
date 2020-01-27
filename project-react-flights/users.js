const router= require("express").Router()
const db= require("./db")
const session=require('express-session')
const uuid= require("uuid")

router.use(session({
    secret:"blahBlahBlah",
    resave: false,
    saveUninitialized: true,
      cookie:{secure: false,maxAge:24*60*60*1000, httpOnly:false }
}))


const checkUser=(req,res,next)=>{
console.log(req.session.username);
const q= `SELECT * FROM users WHERE users.username="${req.body.username}"`
db.query(q,(err,results)=>{
    if(err){
        res.sendStatus(401)
        throw err
    }else{
        if(results.length==1){
            req.result=true
        }
    }
    next()
})
}

    
router.post("/register", (req,res)=>{

    // if(req.result){
    //     res.sendStatus(409)
    // }else{
    console.log("blah");
        let q= `INSERT INTO  users(f_name, l_name, username, password)
        VALUES("${req.body.data.f_name}","${req.body.data.l_name}","${req.body.data.username}","${req.body.data.password}")`
        
        db.query(q,(err,result)=>{
        console.log(q);
            if (err){
                res.sendStatus(401)
                throw err
            }else{
                res.sendStatus(200)
            }
        })     
        

    // }
})

// if username is admin
router.get("/login/:user", checkUser,(req,res)=>{
let q= `SELECT  * FROM users WHERE username="${req.params.user}"`
db.query(q,(err,result)=>{
    if (err){
        res.sendStatus(401)
        throw err
    }else{
        if(result.length==1){
            res.json(result[0].admin)
        }else{
            res.sendStatus(401)
        }
    } 
})
})
//check if there is any session
router.get("/login",checkUser, (req,res)=>{
    console.log(req.session);

    if(req.session.username){
        res.json(req.session.username)
    }else{
        res.sendStatus(403)
    }
})

// check user and adding session
router.post("/login", checkUser, (req,res)=>{
        
    let q= `SELECT * FROM users WHERE username="${req.body.username}" and password="${req.body.password}"`
       
        db.query(q,(err,result)=>{
            if (err){
                res.sendStatus(401)
                throw err
            }else{
                if(result.length==0){
                    res.sendStatus(403)
                }else{
                    if ( !req.session.username){
                        req.session.username=req.body.username
                        req.session.save()
                        console.log(req.session);
                        res.send(req.session)
             
                    }else{
                    req.session.regenerate(()=>{
                        req.session.username=req.body.username
                        res.sendStatus(200)
                    })
                }
                }
            }
        })     
})
// getting all users for gegister validation
router.get("/usernames",(req,res)=>{
    let q=`SELECT username FROM users`
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