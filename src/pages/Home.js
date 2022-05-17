import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  filterCategoryThunk,
  filterProductName,
  getCategoriesThunk,
  getProductsThunk,
} from '../redux/actions';
import '../styles/home.css';

const Home = () => {
  const dispatch = useDispatch();

  // State to control input search to get value
  const [productName, setProductName] = useState('');

  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const searchProduct = e => {
    e.preventDefault();
    dispatch(filterProductName(productName));
  };

  console.log(products);
  console.log(categories);

  return (
    <div className="home-products-cards">
      {/* <div className='images-hover'>
            <img className='over' src="https://firebasestorage.googleapis.com/v0/b/ecommerce-e1a36.appspot.com/o/img%2Fproducts%2F10-1-y.jpg?alt=media&token=418033b4-aa60-4dbf-b3e2-edde2f5302a6" alt="" />
                <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-e1a36.appspot.com/o/img%2Fproducts%2F10-1-z.jpg?alt=media&token=ac6422b1-aef1-4ebf-a1b7-4b73ff906a5d" alt="" />
                
            </div> */}

      {/* make de input, as a form  */}
      <form onSubmit={searchProduct}>
        <input
          className="input"
          type="text"
          placeholder="what are you looking for"
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />
        <button className='search-button'>Search</button>
      </form>

      {categories.data?.categories.map(category => (
        <button
          key={category.id}
          onClick={() => dispatch(filterCategoryThunk(category.id))}
        >
          {category.name}
        </button>
      ))}

      <ul className="products-list">
        {products.length === 0 ? (
          <p>We didn't find products with that filter</p>
        ) : (
          products.data?.products.map(productItem => (
            <li className="images-hover" key={productItem.id}>
              <Link to={`/shop/${productItem.id}`}>
                <img className="over" src={productItem.productImgs[1]} alt="" />
                <img width="200px" src={productItem.productImgs} alt="" />

                <h1>{productItem.title}</h1>
              </Link>

              <h3>Price: ${productItem.price} USD</h3>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
