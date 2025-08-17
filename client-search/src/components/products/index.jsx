import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import '../home/index.css';
 
const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const query = searchParams.get('query');
    const [searchTerm, setSearchTerm] = useState(query);
    const [sortOrder, setSortOrder] = useState(''); // State for sort order
    // Get the 'query' parameter from the URL search params
    
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
            searchTerm: searchTerm || query,
        });
        setProducts(result.data);
    } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
    }
};
    useEffect(() => {
        fetchProducts();
    },[query])

const handleChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
        if (value=== 'Price desc') {
            setProducts((prevProducts) => [...prevProducts].sort((a, b) => b.rate - a.rate));
        } else if (value === 'Price asc') {
            setProducts((prevProducts) => [...prevProducts].sort((a, b) => a.rate - b.rate));
        } else if (value === 'Name asc') {
            setProducts((prevProducts) => [...prevProducts].sort((a, b) => a.productname.localeCompare(b.productname)));
        } else if (value === 'Name desc') {
            setProducts((prevProducts) => [...prevProducts].sort((a, b) => b.productname.localeCompare(a.productname)));
        }
    };
  return (
      <div>
        <input value={searchTerm}
        className="search-input"
        onChange={(e)=>setSearchTerm(e.target.value)} />
        <button className="search-button" onClick={() => fetchProducts()}>Search</button>
        <div>Search Results for: "{searchTerm || '...'}"</div>
        {error && <p className="error">{error}</p>}

        <div className="product-list">
            {products.length > 0 && !products.message ? (
                <div >
                    <select className="sort-by" onChange={handleChange}>
                        <option value="">Sort By</option>
                        <option value="Price desc" >Price: High to Low</option>
                        <option value="Price asc">Price: Low to High</option>
                        <option value="Name asc">Name: A-Z</option>
                        <option value="Name desc">Name: Z-A</option>
                    </select>
                    <div className="product-count">
                            {products.length} products found
                        </div>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product?.productid} className="product-item">
                                <img src={product.productimage} alt={product.productname} className="product-image" />
                                <h2>{product.productname}</h2>
                                <p>Category: {product.productcategory}</p>
                                <p>Price: ${product.rate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No products found.</p>
            )}
            
        </div>
        </div> 
  );
}
export default Products;