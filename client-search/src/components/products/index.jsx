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
                const result = await axios.post('http://localhost:3002/api/products/search', {
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
        <pre>{JSON.stringify(products, null, 2)}</pre>
        </div> 
  );
}
export default Products;