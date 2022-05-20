import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addQuantityThunk, getProductsThunk } from '../redux/actions';
import '../styles/shopId.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //state to filter products for category
  const [filterProducts, setFilterProducts] = useState([]);

  // Sate to control add cart quantity
  const [quantity, setQuantity] = useState(0);

  const products = useSelector(state => state.products);

  useEffect(() => dispatch(getProductsThunk()), [dispatch]);

  const productFind = products.data?.products.find(
    productItem => productItem.id === Number(id)
  );
  // console.log(productFind?.category.id);

  //Filter products for category petition
  useEffect(() => {
    if (productFind) {
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productFind?.category.id}`
        )
        .then(res => setFilterProducts(res.data));
    }
  }, [dispatch, productFind]);

  // console.log(filterProducts);
  const addCart = () => {
    const productsQuantity = {
      id: id,
      quantity: quantity,
    };
    dispatch(addQuantityThunk(productsQuantity));
  };

  return (
    <section className="shop-id">
      <div className="images-hover shop-box-img ">
        <img className="over" src={productFind?.productImgs[1]} alt="" />
        <img src={productFind?.productImgs} alt="" />
      </div>

      <div className="shop-box-description">
        <h1>{productFind?.title}</h1>
        <p>{productFind?.description}</p>
        <h3>$ {productFind?.price} USD</h3>
        {/* <h3>{id}</h3> */}

        <div className="add-cart-box">
          <div className="input-container">
            <button onClick={() => setQuantity(quantity - 1)}> - </button>
            <label htmlFor="quantity">{quantity}</label>
            {/* <input type="text" id='quantity' value={quantity} onChange={ e => setQuantity(e.target.value)}/> */}
            <button onClick={() => setQuantity(quantity + 1)}> + </button>
          </div>
          <button className="main-add-button" onClick={addCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <ul className="product-list-filter">
        {filterProducts.data?.products.map(productItem => (
          <li key={productItem.id}>
            <Link to={`/shop/${productItem.id}`}>
              <img width="200px" src={productItem.productImgs} alt="" />
              <h1>{productItem.title}</h1>
              <h3>Price: ${productItem.price} USD</h3>
            </Link>

            <FontAwesomeIcon
              className="second-add-button"
              icon={faCartShopping}
            />

            {/* <button >
                                add to cart
                            </button> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shop;
