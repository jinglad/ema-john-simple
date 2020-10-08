import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const { name, quantity, img, key, price } = props.product;
    return (
        <>
            <div className="product">
                <div style={{ marginLeft: "20px", marginRight: "30px" }}>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h4 className="product-name">{name}</h4>
                    <p>Quantity: {quantity}</p>
                    <p><small>Price : ${price * quantity}</small></p>
                    <button className="add-to-cart-btn" onClick={() => props.removeItem(key)}>Remove</button>
                </div>
            </div>
        </>
    );
};

export default ReviewItem;