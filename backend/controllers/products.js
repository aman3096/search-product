const db = require('../db/index');

exports.getProducts = async(req, res, next)=> {
    try {
        const { location, category, searchTerm } = req.body;
        const result = await db.query(`SELECT * FROM products WHERE locationserved && $1  OR productcategory ILIKE $2 OR productname ILIKE $3`,
            [[location], `%${category}%`, `%${searchTerm}%`]
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