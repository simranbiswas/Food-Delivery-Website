import axios from 'axios';
import store from './store';

const authConstants = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}

const cartConstants = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
  RESET_CART: "RESET_CART",
  ADD_TO_CART: "ADD_TO_CART"
};

const token = window.localStorage.getItem('token');

const axiosa = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers:{
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosa.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${ auth.token }`;
    }

    return req;
})

axiosa.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    const {status} = error.response;

    if(status==500 || status==400){
        localStorage.clear();
        store.dispatch({
            type: authConstants.LOGOUT_SUCCESS
        });
    }
    return Promise.reject(error);
})
/*
const getCartItems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axiosa.post(`/user/getCartItems`);
            if (res.status === 200) {
                const { cartItems } = res.data;
                console.log({ getCartItems: cartItems })
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addToCart = (food_id, newQty = 1) => {
    return async dispatch => {

        const {
                cart: {
                    cartItems
                },
                auth } = store.getState();
        //console.log('action::products', products);
        //const product = action.payload.product;
        //const products = state.products;
        const qty = cartItems[restaurants.cuisine.food_id] ? parseInt(cartItems[restaurants.cuisine.food_id].qty + newQty) : 1;
        cartItems[restaurants.cuisine.food_id] = {
            ...food_id,
            qty
        };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                // cartItems: Object.keys(cartItems).map((key, index) => {
                //     return {
                //         quantity: cartItems[key].qty,
                //         product: cartItems[key]._id
                //     }
                // })
                cartItems: [{
                    food_id: restaurants.cuisine.food_id,
                    quantity: qty
                }]
            };
            console.log(payload);
            const res = await axiosa.post(`/user/cart/addtocart`, payload);
            console.log(res);
            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }

        console.log('addToCart::', cartItems);

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems }
        });
    }
}



export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null;

        console.log('upppppppppp')

        if (auth.authenticate) {
            localStorage.removeItem('cart');
            //dispatch(getCartItems());
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post(`/user/cart/addtocart`, payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            }
        } else {

            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems }
                });
            }
        }



    }
}



export {
    getCartItems
}

*/

export const addToCart = (cartItem) =>{
    return async dispatch => {
        const { cartItems} = store.getState().cart;

        dispatch({
            type: cartConstants.ADD_TO_CART,
            payload: { cartItems: cartItem}
        });
    }
}