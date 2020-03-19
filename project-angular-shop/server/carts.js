const router = require("express").Router()
const db = require("./db")


// GET LOGGED USER CART CREATION DATE BY CART ID
router.get("/cart/:id",(req,res)=>{
    let q=`SELECT date_of_creation from cart where id=${req.params.id}`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.json(result)
        }
    })
})

// CREATE NEW CART 
router.post("/new", (req, res) => {
    console.log("blahhhhhhhhhhhhhh")
    let { email } = req.body
    if (email) {
        console.log(email)
        let qq = `SELECT id FROM users WHERE email="${email}"`
        db.query(qq, (err, id) => {
            if (err) {
                console.log(qq);
                res.sendStatus(400)
                throw err
            } else {

                console.log(id[0].id)
                // chacking if user has a cart
                let cartOrNot = `SELECT id from cart where costumer_id="${id[0].id}" and paid="0" `
                db.query(cartOrNot, (err, cartId) => {
                    console.log(cartId,"overhEREE");
                    if (err) {
                        res.sendStatus(400)
                        throw err
                    } else {
                        if (cartId.length > 0) {
                            res.json(cartId)
                        } else {
                            console.log(id[0].id,"Sxddsdd");
                            // chacking what is user last order and if he have an order at all
                            let chackingIfFirstBuy=`SELECT MAX(id) AS LastOrder FROM cart
                            where paid=1 and costumer_id="${id[0].id}"`
                            db.query(chackingIfFirstBuy,(err,cartIdOrNull)=>{
                                if(err){
                                    res.sendStatus(400)
                                    throw err
                                }else if(cartIdOrNull[0].LastOrder!=null){
                                    console.log(cartIdOrNull,"blahbli");
                                        res.json(cartIdOrNull)
                                    
                                    }else{
                                        res.json("nope")
                                    }
                            })

                        }
                    }
                })
            }
        })
    }

})

// CREATING NEW CART FOR NEW USER
router.post("/newCart",(req,res)=>{
        let { email } = req.body
        if (email) {
            console.log(email)
            let qq = `SELECT id FROM users WHERE email="${email}"`
            db.query(qq, (err, id) => {
                if (err) {
                    res.sendStatus(400)
                    throw err
                } else {
                    if(id.length>0){

                        console.log(id,"id")
                        // inserting new cart into carts table
                        let q = `INSERT INTO cart(costumer_id) VALUES("${id[0].id}")`
                        db.query(q, (err, result) => {
                            if (err) {
                                res.sendStatus(404)
                                throw err
                            } else {
                                console.log(result.insertId);
                                res.json(result.insertId)
                            }
                        })
                    }
                }
    })
}
    
    })
// ADDING NEW ITEM TO CART ITEMS
router.post("/add/:id", (req, res) => {
            let cart_id =req.params.id
         
            let { item_id, amount } = req.body
            if (item_id && amount && cart_id) {
                // selsecting item current price
                let q = `SELECT item.price FROM item WHERE item.id=${item_id}`
                db.query(q, (err, result) => {
                    if (err) {
                        res.sendStatus(err)
                        throw err
                    } else {
                        // price for the amount of items selected 
                        let sum = amount * result[0].price
                        if (sum) {
                      
                            let existing = `SELECT item_id, cart_id FROM cart_items WHERE item_id=${item_id} and cart_id=${cart_id}`
                            db.query(existing, (err, result1) => {
                                if (result1.length > 0) {
                                    console.log(result1);
                                    if (err) {
                                        res.sendStatus(400)
                                        throw err
                                    } else {
                                        // selecting already existing items
                                        let exist = `UPDATE cart_items 
                                         SET amount=${amount}, price=${sum} 
                                        WHERE item_id=${item_id} and cart_id=${cart_id}`
                                        db.query(exist, (err, result2) => {
                                            if (err) {
                                                res.sendStatus(404)
                                                throw err
                                            } else {
                                                res.json(result2);
                                            }
                                        })
                                    }
                                } else {
                                   console.log(item_id,amount,cart_id,sum);
                                    // inserting new item into cart_items table
                                    let qq = `INSERT INTO cart_items(item_id,amount,price,cart_id)
                                VALUES(${item_id},${amount},${sum},${cart_id})`
                                    db.query(qq, (err, finelRes) => {
                                        if (err) {
                                            res.sendStatus(400)
                                            throw err

                                        } else {
                                            res.json(finelRes)
                                        }
                                    })
                                }
                            })
                        }

                    }
                })
            }
})

// RETURN CART ITEMS BY CART ID
router.get("/:id",(req,res)=>{
    let q = `SELECT item.id, item.item_name, cart_items.amount, cart_items.price,item.image_url,cart_items.cart_id
            FROM cart_items
            INNER JOIN item
            ON cart_items.item_id=item.id
            INNER JOIN cart
            ON cart_items.cart_id=cart.id
            WHERE cart.id=${req.params.id}`
            db.query(q, (err, result) => {
             if (err) {
                    res.sendStatus(400)
                    throw err
                } else {
                    res.json(result)
                }
            })
    
})


// GET TOTAL CART ITEMS PRICE
router.get("/price/:id", (req, res) => {
    // summing cart items for a loged in user 
    let q = `SELECT sum(cart_items.price) as price
    FROM item
    INNER JOIN cart_items
    ON cart_items.item_id=item.id
    WHERE cart_items.cart_id="${req.params.id}"`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(400)
            throw err
        } else {
            res.json(result)
        }
    })
})

// DELETE ITEM FROM CART ITEMS
router.post("/:id", (req, res) => {
    console.log(req.body, req.params, "fddfvrf");
    // checking if user want to delete all cart or just one item
    let qq = `SELECT cart_items.item_id,cart_items.cart_id
        from item
        inner join cart_items
        on item.id=cart_items.item_id
        where item.id=${req.body.id} and cart_items.cart_id=${req.params.id}`
    db.query(qq, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else if (result[0].item_id) {
            console.log("blah");
            // deleting one cart item
            let q = `DELETE FROM cart_items WHERE item_id=${result[0].item_id} and cart_id=${req.params.id}`
            db.query(q, (err, result1) => {
                console.log(result1);
                if (err) {
                    res.sendStatus(400)
                    throw err
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })

})

router.delete("/:id", (req, res) => {
    // deleting all cart items
    let qq = `DELETE FROM cart_items WHERE cart_id=${req.params.id}`
    db.query(qq, (err, result2) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.sendStatus(200)
        }
    })
})



module.exports = router