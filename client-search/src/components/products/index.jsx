import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
 
const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    // Get the 'query' parameter from the URL search params
    const query = searchParams.get('query');
    
    useEffect(() => {
        const fetchProducts = async () => {
            // Don't fetch if there's no query term.
            if (!query) {
                setProducts([]);
                return;
            };

            try {
                setError(null); // Reset error on new search
                const result = await axios.post('http://localhost:3002/api/search/', {
                    location: 'Bangalore',
                    category: 'Electronics',
                    searchTerm: query
                });
                setProducts(result.data);
            } catch (err) {
                setError('Failed to fetch products.');
                console.error(err);
            }
        };
        fetchProducts();
    },[query])

  return (
      <div>
        <h1>Search Results for: "{query || '...'}"</h1>
        {error && <p className="error">{error}</p>}
        <p>Found {products.length} products.</p>

        <div className="product-list">
            {products.length > 0 && !products.message ? (

                products.map((product) => (
                    <div key={product?.productid} className="product-item">
                        <img src={product.productimage} alt={product.productname} className="product-image" />
                        <h2>{product.productname}</h2>
                        <p>Category: {product.productcategory}</p>
                        <p>Price: ${product.rate}</p>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
        </div> 
  );
}
export default Products;