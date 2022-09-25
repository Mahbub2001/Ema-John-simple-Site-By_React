import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
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
    

    //local storage
    useEffect(()=>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product=>product.id === id );
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        SetCart(savedCart);
    },[products])//dependency injection//products by products

    const handleAddToCart = (selectedProduct) =>{
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product.id===selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart,selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity+1;
            newCart = [...rest,exists];
        }
        SetCart(newCart);
        addToDb(selectedProduct.id)
        
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;