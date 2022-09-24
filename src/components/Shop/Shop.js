import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [products,setProducts] = useState([]);

    const [cart,SetCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data));
    },[])

    const handleAddToCart = (product) =>{
        // console.log(product);
        const newCart = [...cart,product];
        SetCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {/* <h3>This is for products : {products.length}</h3> */}
                {
                    products.map(product => <Product 
                        key={product.id}
                        product = {product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
                <p>Selected Items : {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;