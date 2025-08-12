var express = require('express');
var router = express.Router();
const products = require('../controllers/products')
/* GET users listing. */
router.post('/search', async function(req, res, next) {
  try {
    const results = await products.getProducts(req, res, next);
    res.send(results);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/search', function(req, res) {
  res.json({ message: 'Search Message' });
});
module.exports = router;
