const express = require('express');
const router = express.Router();
const {desYonex88d} = require('../controllers/homeController.js');

router.get('/yonex-astrox-88d',  desYonex88d );

module.exports =router;
