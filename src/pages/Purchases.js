import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/purchases.css';
import { deleteProductCartThunk } from '../redux/actions';

const Purchases = ({ isOpen}) => {

    const purchaseCart = useSelector( state => state.purchaseCart);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    

    console.log(purchaseCart);
    return (
        <div className={`purchases-modal ${isOpen ? 'open' : ''}`}>
            Purchases

            <ul className='purchase-cart'>
                {
                    purchaseCart.data?.cart.products.map( purchase => (
                        <li key={purchase.id} onClick={() => navigate(`/shop/${purchase.id}`)}>
                            {purchase.title}
                            <br />${purchase.price} USD
                            <br />{purchase.productsInCart.quantity}

                            <FontAwesomeIcon
                                className='icon-trash' 
                                icon={faTrash}
                                onClick={() => dispatch(deleteProductCartThunk(purchase.id))}
                            />

                        </li>
                    ))
                }
            </ul>
                        

                    
            
        </div>
    );
};

export default Purchases;