import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        fetch('https://jinglad-ema-john-simple-backend.glitch.me/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);

        fetch('https://jinglad-ema-john-simple-backend.glitch.me/productsByKeys', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, []);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // console.log(product);
        // const newCart = [...cart, product];
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // console.log(sameProduct);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }

    console.log(cart);

    return (
        <div className="shop-container">
            <div className="product-container">
                <input onBlur={handleSearch} type="text" className="product-search"/>
                {
                    products.length === 0 && <CircularProgress />
                }
                <ul>
                    {
                        products.map(pd => <Product key={pd.key} product={pd} handleAddProduct={handleAddProduct} showAddToCart={true}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-to-cart-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
