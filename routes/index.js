var express = require('express');
var router = express.Router();
const { Usuario, Produto } = require('../models')

/* GET home page. */

router.get('/', async function(req, res, next) {
  const obj = { 
    produtos: await Produto.findAll()
  }
  res.render('index', obj);
});
module.exports = router;
