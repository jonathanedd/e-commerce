// import axios from 'axios';
import React, { useState } from 'react';
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome';
import {faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { loginThunk, purchasesCartThunk } from '../redux/actions';
import { Purchases } from '../pages';

const NavBar = () => {

    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [ isPurchasesOpen, setIsPurchasesOpen ] = useState(false);

    // Input control states
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ loginErr, setLoginErr ] = useState('');

    const dispatch = useDispatch();

    const openPurchaseCart = () => {
        setIsPurchasesOpen(!isPurchasesOpen);
        dispatch(purchasesCartThunk())
    }

    //Login button functionality
    const submit = (e) => {
        e.preventDefault();
        const credentials = {email, password }
        dispatch(loginThunk(credentials))
            .then( res =>{ 
                localStorage.setItem('token', res.data.data.token)
                setLoginErr('');
                setIsLoginOpen(false);
                
            })
            .catch( err => {
                setLoginErr(err.response.data.message);
            })
            
    }

    


    return (
        <div className='nav-bar'>

            <nav className='mini-nav'>
                <strong>e-commerce</strong>
                <FontAwesomeIcon 
                    className='icon' 
                    icon={faUser} 
                    onClick={() => setIsLoginOpen(!isLoginOpen)} 
                />

                <FontAwesomeIcon 
                    className='icon-purchases' 
                    icon={faCartShopping}
                    onClick={openPurchaseCart}
                />
                
                
            </nav>
            


            
             
            <form onClick={submit} className={`login ${isLoginOpen ? 'open' : ' '}`}>

                {
                    localStorage.getItem('token') ? (
                        <button onClick={() => localStorage.setItem('token', "")} type='button'>
                            Log out
                        </button>
                    ) : (

                        <>
                            <p>Email</p>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => 
                                setEmail(e.target.value)} 
                                placeholder='example@email.com'
                            />
                            <p>Password</p>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => 
                                setPassword(e.target.value)} 
                                placeholder='********' 
                            />
                            <p>{ loginErr }</p>
                            <button>Login</button>
                        </>
                        
                    )
                }
                
            </form>


            
            
            <Purchases isOpen={isPurchasesOpen} />
            
        </div>
    );
};

export default NavBar;