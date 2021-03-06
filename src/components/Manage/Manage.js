import React from 'react';

const Manage = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch('https://jinglad-ema-john-simple-backend.glitch.me/addProduct', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Product Image: </span><input type="file" /></p>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Manage;