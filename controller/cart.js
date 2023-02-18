const menuitems = require('../data/menu')
// const user = require('./')
const shoppingCarts = require('../data/cart')

exports.addtocart = (req, res) => {
    const { id } = req.params;
  
    try {
        
        // Find the menu item by ID
        const menuItem = menuitems.find(item => item.id == id);
        if (!menuItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
      
        // Find logged user cart 
        const foundCart = shoppingCarts.find( c => c.userId == req.user.id)
        console.log(foundCart)
    
        // Add the menu item to the user's cart
        let itemIndex = foundCart.items.findIndex(i => i.id == menuItem.id)
        if(itemIndex == -1){
            foundCart.items.push({id:menuItem.id , quantity:1})
            res.status(201).json(foundCart);
        }
        foundCart.items[itemIndex].quantity++
    
        res.status(201).json(foundCart);
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.deleteitem = (req, res) => {
    const { id } = req.params;

    try {
        
        
          const menuItem = menuitems.find(item => item.id == id);
          if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
          }
      
          const cart = shoppingCarts.find( c => c.userId == req.user.id)
          const itemIndex = cart.items.findIndex( i => i.id == menuItem.id)
          
          if(itemIndex == -1){
              return res.status(404).json({ error: 'item not found in cart' });
          }
          
          if(cart.items[itemIndex].quantity == 1){
              cart.items.splice(itemIndex , 1)
              return res.status(200).json(cart);
          }
         
              cart.items[itemIndex].quantity--
              return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
  }
  
  exports.getCart = (req,res,next)=>{
    const foundCart = shoppingCarts.find( c => c.userId == req.user.id)
    if(!foundCart){
        return res.status(404).json({ error: 'cart not found' });
    }

    return res.status(200).json(foundCart);
  }