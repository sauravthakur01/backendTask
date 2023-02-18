const express = require('express');
const tokenController = require('../controller/token')

const router = express.Router();

// Create a new token (login)
router.post('/', tokenController.createToken);

// Delete a token (logout)
router.delete('/:id', tokenController.deleteToken);

module.exports = router;