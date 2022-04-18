import React from 'react';
import '../styles/loading-screen.css';

const IsLoading = () => {
    return (
        <div className='loading-screen'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default IsLoading;