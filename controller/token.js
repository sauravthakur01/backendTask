const Token = require('../data/token');
const users = require('../data/users');
const uuid = require('uuid')


exports.createToken = (req, res) => {
    const { email } = req.body;
  
    // Find the user by email address
    const user = users.find(u => u.email == email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Create a new token for the user
    const newToken = {
          userId : user.id,
          id : uuid.v4()
      };
    Token.push(newToken);
  
    res.status(201).json({ token: newToken.id });
  }

  exports.deleteToken =(req, res) => {
    const { id } = req.params;
  
    // Find the index of the token by ID
    const index = Token.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Token not found' });
    }
  
    // Remove the token from the array
    Token.splice(index, 1);
  
    res.status(200).json({data: 'logout succesfull'});
  }