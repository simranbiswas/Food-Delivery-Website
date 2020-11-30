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

const userConstants = {
    USER_REGISTER_REQUEST : 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS : 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE : 'USER_REGISTER_FAILURE'
}
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


export const login = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axiosa.post('/login',{
            ...user
        });

        if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
        
    }
}
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}


export const signup = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const res = await axiosa.post('/signup', {
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {message}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST }); 
        const res = await axiosa.post('/signout');

        if(res.status === 200){ 
            localStorage.clear();
            dispatch({ 
                type: authConstants.LOGOUT_SUCCESS
            });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        } 
    }
}
