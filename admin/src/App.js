import './App.css';
import React, { useEffect } from 'react';
import Header from './Containers/Header';
import Homepage from './Containers/Homepage';
import Order from './Containers/Order';
import Details from './Containers/Overview';
import Login from './Containers/Login';
import PrivateRoute from './Components/Priv/PrivateRoute'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {isUserLoggedIn} from './auths.actions';

function App() {

   const dispatch = useDispatch();
   const auth = useSelector(state => state.auth);


   useEffect(() => {
       if(!auth.authenticate){
           dispatch(isUserLoggedIn());
       }
      
   }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <PrivateRoute exact path = '/' component = { Homepage } />
        <PrivateRoute path = "/orders" component={Order} />
        <PrivateRoute path = "/res" component={Details} />
        <Route path = "/admin/login" component = {Login} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
