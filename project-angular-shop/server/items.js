const router = require("express").Router()
const db = require("./db")

// GET AMOUNT OF ALL ITEMS  AVAILABLE IN STORE
router.get("/amount", (req, res) => {
    // counting items
    let q = `SELECT * FROM item`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result.length)
        }
    })
})

// GET ALL CATEGORIES
router.get("/categories",(req,res)=>{
    let q=`SELECT * FROM categories`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.json(result)
        }
    })
})



// GET ALL ITEMS
router.get("/all", (req, res) => {
    // checking if search result exist in item 
    let q = `SELECT * FROM item`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result)
        }
    })})

// GET ITEM BY CATEGORY
router.get("/:category", (req, res) => {
    // joining item with the right category
    let q = `SELECT item.id,item.item_name,item.price, item.image_url
    FROM item
    INNER JOIN categories
    ON item.category_id=categories.id
    WHERE categories.name="${req.params.category}"`
    db.query(q, (err, result) => {
        
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.send(result).status(202)
        }
    })
})



// -------------------------------------------ADMIN REQUEST--------------------------------------------


// ADD NEW ITEM
router.post("/admin/add", (req, res) => {
    let { item_name, category_id, price, image_url } = req.body
    if (item_name && category_id && price && image_url) {
        // inserting new item to items table
        let q = `INSERT INTO item(item_name,category_id,price,image_url)
    VALUES("${item_name}",${category_id},"${price}","${image_url}")`
        db.query(q, (err, result) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                res.json(result)
            }
        })
    }

})

//UPDATE ITEM BY ITEM ID 
router.put("/update/:id", (req, res) => {
    let { item_name, price, image_url } = req.body
    if (item_name && price && image_url) {
        // updating changes 
        let q = `UPDATE item
        SET 
        item.item_name='${item_name}',
         item.price=${price},
        item.image_url='${image_url}'
        WHERE item.id=${req.params.id}`
        db.query(q, (err, result) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                res.json(result)
            }
        })
    }

})














module.exports = router