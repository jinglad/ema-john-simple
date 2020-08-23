import React, { useState } from 'react';
import fakedata from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakedata.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        first10.map(pd => <Product product={pd} handleAddProduct={handleAddProduct}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;