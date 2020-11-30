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
const foodConstants = {

  GET_FOOD_DETAILS_BY_ID_REQUEST: "GET_FOOD_DETAILS_BY_ID_REQUEST",
  GET_FOOD_DETAILS_BY_ID_SUCCESS: "GET_FOOD_DETAILS_BY_ID_SUCCESS",
  GET_FOOD_DETAILS_BY_ID_FAILURE: "GET_FOOD_DETAILS_BY_ID_FAILURE"
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

export const getFoodById = (payload) => {
    return async dispatch => {
        dispatch({ type: foodConstants.GET_FOOD_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { food_id } = payload.params;
            res = await axios.get(`/food/${food_id}`);
            console.log(res);
            dispatch({
                type: foodConstants.GET_FOOD_DETAILS_BY_ID_SUCCESS,
                payload: { foodDetails: res.data.restaurant.cuisine }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: foodConstants.GET_FOOD_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}