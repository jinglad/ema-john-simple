import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    // const productDetails = fakeData.find(product => product.key === productKey);
    // console.log(productDetails);

    return (
        <div>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;
