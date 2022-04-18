import axios from "axios";

export const actions = {
    setProducts: 'SET_PRODUCTS',
    setIsLoading: 'SET_IS_LOADING',
    setCategories: 'SET_CATEGORIES',
    setPurchaseCart: 'SET_PURCHASE_CART'
    
}


const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});


// Function that returns the action
export const setProducts = (products) => ({
    type: actions.setProducts,
    payload: products
});

// Function that returns isLoading 
export const setIsLoading = (isLoading) => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = (categories) => ({
    type: actions.setCategories,
    payload: categories
})

export const setPurchaseCart = (purchaseCart) => ({
    type: actions.setPurchaseCart,
    payload: purchaseCart
})


export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then( res => dispatch(setProducts(res.data)))
            .finally(() => dispatch(setIsLoading(false)))
    }
};

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then( res => dispatch(setCategories(res.data)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

// filter category by ID  
export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
            .then(res => dispatch(setProducts(res.data)) )
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterProductName = (productName) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${productName}`)
            .then( res => dispatch(setProducts(res.data)))
            .finally( () => dispatch(setIsLoading(false)))
    }
} 

export const loginThunk = (credentials) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .finally( () => dispatch(setIsLoading(false)))
    }
};

export const addQuantityThunk = (productsQuantity) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productsQuantity, getConfig())
            .finally(() => dispatch(setIsLoading(false)))
    }
};

export const purchasesCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
            .then( res => dispatch(setPurchaseCart(res.data)))
            // .catch( err => {
            //     if(err.response.status === 400 ){
            //         console.log('El carrito esta vacio');
            //     }
            // })
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const deleteProductCartThunk = (id) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
            .then( () => dispatch(addQuantityThunk()))
            .finally(setIsLoading(false))
    }
}