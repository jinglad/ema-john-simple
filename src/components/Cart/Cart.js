import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i].price * (cart[i].quantity || 1);
        // console.log(element);
        total += element;
        total = Math.round(total);
    }

    // Math.round(total);

    // console.log(total);

    let shipping = 0;
    if (total > 35) shipping = 0;
    else if (total > 15) shipping = 4.99;
    else if (total > 0) shipping = 12.99;

    let tax = Math.round(total / 10);

    let totalPrice = (total + shipping + tax).toFixed(2);

    return (
        <div>
            <h2>Order Summery: {cart.length}</h2>
            <p>Product Price : {total}</p>
            <p>Shipping : {shipping}</p>
            <p>Tax and Vat : {tax}</p>
            <p>Total Price : {totalPrice}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;