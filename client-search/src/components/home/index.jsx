
import React from 'react';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './index.css';
const Home = () => {
    const [product, setProduct] = useState('')
    const navigate = useNavigate();

    const navigateToSearchPage = () => {
        if(product) {
            navigate(`/products?query=${encodeURIComponent(product)}`);
        }
    }
    return (
        
        <React.Fragment>
        <h1>Welcome to Styli eCommerce</h1>
            <div className="card">
                <input 
                    placeholder='Enter a product to search'
                    value ={product}
                    onChange={(e)=>{setProduct(e.target.value)}}
                    className="search-input"
                />
            </div>
            <button className="search-button" disabled={!product.length} onClick={navigateToSearchPage}>Search</button>

      </React.Fragment>
    );
}

export default Home;