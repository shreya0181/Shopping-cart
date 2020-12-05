const express =require('express');

// Item model 
const Item = require('../../modles/item');
const router = express.Router();






// @route GET api/items
// @desc  get all the items 
// @access Public 

router.get("/", (req, res)=>{
      Item.find()
     .sort({date : -1})
     .then(items => res.json(items));
   
});

// @route POST api/items
// @desc  Create  a Item
// @access Public 
router.post("/", (req, res)=>{
    const newItem = new Item({
        name : req.body.name
    });
    // returning the json object in the result 
    newItem.save().then(item=> res.json(item));
});


// @route Delete api/items/:id
// @desc  Delete an Item
// @access Public 
router.delete("/:id", (req, res)=>{
    Item.findById(req.params.id)
      .then(item => item.remove()
      .then(item => res.json({success : true })))
      .catch(err => res.status(404).json({success:false}));
   
});

module.exports = router ; 