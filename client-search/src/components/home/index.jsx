
import React from 'react';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

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
        <h1>Welcome to Styli eCommerce first draft</h1>
            <div className="card">
                <input placeholder='Enter a product to search' value ={product} onChange={(e)=>{setProduct(e.target.value)}} />
                <button disabled={!product.length} onClick={navigateToSearchPage}>Search</button>
            </div>
      </React.Fragment>
    );
}

export default Home;