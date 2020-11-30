import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Details from './Components/Details';
import Header from './Components/Header';
import Login from './containers/Login';
import Signup from './containers/Signup';
import PrivateRoute from './Components/Priv/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import {isUserLoggedIn} from './auths.actions';
import Cart from './containers/Cart';   
import Checkout from './containers/Checkout';

const Router = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    useEffect(() => {
        if(!auth.authenticate){
            dispatch(isUserLoggedIn());
        }
        
    }, []);

    return(
        <BrowserRouter>
            <Header />
            <PrivateRoute exact path = "/" component={Home} />
            <PrivateRoute path = "/cart" component={Cart} />
            <PrivateRoute path = "/filter" component={Filter} />
            <PrivateRoute path = "/details" component={Details} />
            <PrivateRoute path = "/checkout" component={Checkout} />
            <Route path = "/login" component={Login} />
            <Route path = "/signup" component={Signup} />
        </BrowserRouter>
    )
}
export default Router;