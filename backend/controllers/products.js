const db = require('../db/index');

exports.getProducts = async(req, res, next)=> {
    try {
        const { searchTerm } = req.body;
        const result = await db.query(`SELECT * FROM products WHERE productname ILIKE $1 ORDER BY productname ASC`,
            [`%${searchTerm}%`]
        );
        const products = result.rows;
        if (products.length > 0) {
            res.status(200).json(products);  
        } else {
            res.status(200).json({ message: 'No products found' });
        }
        next();
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};