const router = require("express").Router()
const db = require("./db")
let jwt = require('jsonwebtoken');
const SECRET = "1234YAM"

// TODO chack if user or admin has local storag with a token in user page and admin page 
// SELECTING ALL FROM USERS FOR CHACKING DOPLICATED EMAIL/ID
router.get("/info", (req,res)=>{
    let q=`SELECT * FROM users`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
            res.json(result)
        }
    })
})

// GETTING CURRENT LOGGED USER
router.get("/loged/:id", (req,res)=>{
    let q=`SELECT users.id,users.name,users.email,users.city,users.street 
    from users
    INNER JOIN cart 
    on users.id=cart.costumer_id
    where cart.id=${req.params.id}`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(404)
            throw err
        }else{
            res.json(result)
        }
    })
}) 

// REGISTRATION
router.post("/register", (req, res) => {
    let { id, name, email, password, city, street } = req.body
    if (id, name, email, password, city, street) {
        // checking if email or id already exist 
        let qq = `SELECT users.email from users WHERE users.email="${email}" or users.id="${id}"`
        db.query(qq, (err, result) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                if (result.length > 0) {
                    res.sendStatus(403)
                } else {
                    // inserting new user into users table
                    let q = `INSERT INTO users(id,name,email,password,city,street)
                        VALUES("${id}","${name}","${email}","${password}","${city}","${street}")`
                    db.query(q, (err, result1) => {
                        if (err) {
                            res.sendStatus(404)
                            throw err
                        } else {
                            res.send(result1).status(202)
                        }
                    })
                }
            }
        })

    }
})

// MIDDLE FUNCTION FOR CHECKING IF ADMIN OR USER
const checkAdmin = (req, res, next) => {
    const q = `SELECT * FROM users WHERE users.email="${req.body.email}" and users.password="${req.body.password}"`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(401)
            throw err
        } else {
            if(result.length>0){
                if (result[0].manager == 1) {
                    req.admin = true
                }else{
                    req.admin = false
                }
            }else{
                res.sendStatus(403)
            }
        }
        next()
    })
}

// CREATING TOKEN FOR A USER OR CHECKING EXISTING TOKEN 
router.post("/login", checkAdmin, (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        jwt.sign({ email }, SECRET, { expiresIn: '1m' }, (err, token) => {
            if (err) {
                res.sendStatus(500)
                throw err
            } else {
                res.send({ token : token, admin : req.admin })
            }
        })
    } else {
        // verification
        jwt.verify(req.body.token, SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                if (decoded.email) {
                    let q = `SELECT * from users WHERE email="${decoded.email}"`
                    db.query(q, (err, result) => {
                        if (err) {
                            res.sendStatus(404)
                            throw err
                        } else {
                            res.json(result)
                        }
                    })
                } else {
                    res.sendStatus(403)
                }
            }
        })

    }
})

module.exports = router