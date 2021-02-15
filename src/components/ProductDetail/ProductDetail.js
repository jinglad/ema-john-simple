import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://jinglad-ema-john-simple-backend.glitch.me/product/${productKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productKey]);

  // const productDetails = fakeData.find(product => product.key === productKey);
  // console.log(productDetails);

  // console.log(product);

  return (
    <div>
      {loading ? (
        <p>Loading...!</p>
      ) : (
        <Product product={product} showAddToCart={false}></Product>
      )}
    </div>
  );
};

export default ProductDetail;
