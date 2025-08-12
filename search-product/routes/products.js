var express = require('express');
var router = express.Router();
const products = require('../controllers/products')
/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource', products.getProducts(req, res, next));
});

module.exports = router;
