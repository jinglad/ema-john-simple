import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const productDetails = fakeData.find(product => product.key === productKey);
    // console.log(productDetails);
    return (
        <div>
            <Product product={productDetails} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;