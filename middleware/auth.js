const tokens = require('../data/token')
const users = require('../data/users')

exports.verify = (req,res,next)=>{
    const token = req.header('Authorization');

    const foundToken = tokens.find( t => t.id === token)
    if(!foundToken){
        res.status(404).json('token not found')
    }
    const foundUser = users.find( u => u.id === foundToken.userId)
    req.user = foundUser
    next()
}