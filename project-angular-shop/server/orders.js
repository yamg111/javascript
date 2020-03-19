const router = require("express").Router()
const db = require("./db")


// AMOUNT OF ORDERS IN STORE
router.get("/amount",(req,res)=>{
    // get all orders
    let q= `SELECT * FROM orders`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.json(result.length)
        }
    })
})


// CREATING NEW ORDER
router.post("/new",(req,res)=>{
    let {cart_id , city, street,shipping_date,credit,price} = req.body

    if(cart_id  && city && street && shipping_date && credit && price){
let orderChack=`SELECT * from orders where id=${cart_id}`
db.query(orderChack,(err,chack)=>{
    if(err){
        res.sendStatus(400)
        throw err
    }else{
        if(chack.length==0){
            console.log(chack);
            console.log(shipping_date);
            let q=`SELECT shipping_date FROM orders WHERE shipping_date="${shipping_date}"`
            db.query(q,(err,result)=>{
                console.log(result);
                if(err){
                    res.sendStatus(400)
                    throw err
                }else{
               if(result.length>=3){
                   console.log(result,"blahhhhhhhhhhhhh");
                   res.json(result.length)
                }else{
                    let qq=`INSERT INTO orders(cart_id,price,city,street,shipping_date, credit)
                    VALUES(${cart_id} , ${price }, "${city}" , "${street}","${shipping_date}","${credit}")`
                    db.query(qq,(err,result1)=>{
                       if(err){
                           res.sendStatus(400)
                           throw err
                        }else{
                            // updating cart was paid
                            let qqq=`UPDATE cart
                            SET paid="1"
                            WHERE id=${cart_id} `
                            db.query(qqq,(err,result)=>{
                                if(err){
                                    res.sendStatus(400)
                                    throw err
                                }else{
                                    
                                    res.json(result1)
                                }
                            })
                        }
                    })
                }
            }
        })
    }else{
        res.json("1")
    }
}
})
 }
})

// GETTING ALL USER ORDERS BY USER ID
router.get("/:id",(req,res)=>{
    // inner join all orders by costumer id
    let q=`SELECT orders.price, orders.city, orders.street
    FROM orders
    INNER JOIN cart
    ON orders.cart_id=cart.id
    WHERE cart.costumer_id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.json(result)
        }
    })
})


// GETTING USER DATE AND PRICE OF LAST ORDER BU CART ID 
router.get("/details/:id",(req,res)=>{
    // inner join all orders by costumer id
    let q=`SELECT orders.price,orders.shipping_date,orders.order_date
    FROM orders
    WHERE cart_id=${req.params.id}`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.json(result)
        }
    })
})
// RECEIPT DETAILS
router.get("/ticket/:id",(req,res)=>{
    // getting all receipt details by order id
    let q= `SELECT users.id,users.name,users.email, orders.price,orders.city,orders.street from users,orders 
    INNER JOIN cart
    on orders.cart_id = cart.id
    where orders.id = ${req.params.id} and cart.costumer_id = users.id`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
        }else{
            res.json(result)
        }
    })
})

module.exports = router