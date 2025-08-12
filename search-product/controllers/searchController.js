const Product = require('../models/productModel');
const db = require('../db/index');

exports.getProducts = async(req, res, next)=> {
    const [location, category, searchTerm] = req.body;
    const result = await db.query(
        `SELECT * FROM products WHERE location = $1 OR category ILIKE $2 OR name ILIKE $3`,
        [location, `%${category}%`, `%${searchTerm}%`]
    );
    const products = result.rows;
    if (products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(404).json({ message: 'No products found' });
    }
    next();
};