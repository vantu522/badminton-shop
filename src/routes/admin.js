const express = require('express');
const router = express.Router();
const {order} =require('../controllers/homeController.js')

router.get('/order', order);

module.exports = router