import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// eslint-disable-next-line
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    // eslint-disable-next-line
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const removeItem = (productKey) => {
        console.log("clicked remove ", productKey);
        const remainItem = cart.filter(pd => pd.key !== productKey);
        setCart(remainItem);
        removeFromDatabaseCart(productKey);
    }

    const handleProceedOrder = () => {
        // console.log("place order clicked");
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }

    useEffect(() => {
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedData[key];
            return product;
        })
        setCart(cartProducts);
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImg} alt="" />
    }

    return (
        <>
            <div className="review-contaoner">
                <div className="product-container">
                    {
                        cart.map(pd => <ReviewItem removeItem={removeItem} key={pd.key} product={pd}></ReviewItem>)
                    }
                    {thankYou}
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="add-to-cart-btn" onClick={handleProceedOrder}>Proceed Order</button>
                    </Cart>
                </div>
            </div>

        </>
    );
};

export default Review;