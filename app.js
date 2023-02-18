const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

const menuItems = require('./data/menu')


const userRouter = require('./routes/user')
const tokenRouter = require('./routes/token')
const cartRouter = require('./routes/cart')


app.use('/users' , userRouter)
app.use('/token' ,  tokenRouter)
app.use('/cart' , cartRouter)
app.get('/menu', (req, res) => {
    res.json(menuItems);
})


app.listen(3000 , ()=>{
    console.log('connected')
})