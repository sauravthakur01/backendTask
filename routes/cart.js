const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart')
const middleware = require('../middleware/auth')

// Add an item to the user's cart
router.post('/:id' ,  middleware.verify , cartController.addtocart)

// Remove an item from the user's cart
router.delete('/remove/:id' , middleware.verify , cartController.deleteitem)

// Get cart items of logged user
router.get('/' , middleware.verify , cartController.getCart)

module.exports = router;