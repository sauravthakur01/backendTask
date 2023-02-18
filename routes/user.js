const express = require('express');
const router = express.Router()

const userController = require('../controller/user')

router.post('/' , userController.addUser)

router.get('/:userId' , userController.getUser )

router.put('/:userId' , userController.updateUser)

router.delete('/:userId' , userController.deleteUser )

router.get('/' , userController.users )

module.exports = router
