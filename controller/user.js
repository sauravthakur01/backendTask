const users = require('../data/users')
const uuid = require('uuid');
const shoppingCarts = require('../data/cart.js')

exports.addUser = (req, res)=>{
    try{
        const { name, email, streetAddress } = req.body;

        // Check if the email address is already in use
        if (users.find(u => u.email === email)) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        // Create the new user
        const id = uuid.v4();
        const newUser = { id, name, email, streetAddress };
        
        const cart = {id:uuid.v4() , userId:newUser.id , items:[]}
        shoppingCarts.push(cart)

        users.push(newUser);
        res.status(201).json(newUser);

    }catch(err){
        res.status(500).json(err)
    }
}

exports.getUser = (req, res)=>{
    try{
        const user = users.find(u => u.id === req.params.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        } 
        res.status(200).json(user);
    
    }catch(err){
        res.status(500).json(err)
    }
}

exports.updateUser = (req, res)=>{
    try{
         // Find the user by ID
        const user = users.find(u => u.id === req.params.userId);
        if (! user) {
            res.status(404).json({ error: 'User not found' });
        } 

        // Update the user's information
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.streetAddress = req.body.streetAddress || user.streetAddress;
        res.json(user);
    
    }catch(err){
        res.status(500).json(err)
    }
}

exports.deleteUser = (req, res)=>{
    try{
        const index = users.findIndex(u => u.id === req.params.userId);
          if (index === -1) {
            res.status(404).json({ error: 'User not found' });
          } 
           
          users.splice(index, 1);
          res.sendStatus(204);
    
    }catch(err){
        res.status(500).json(err)
    }
}

exports.users = (req, res)=>{
    try{
        res.status(200).json(users);
    
    }catch(err){
        res.status(500).json(err)
    }
}