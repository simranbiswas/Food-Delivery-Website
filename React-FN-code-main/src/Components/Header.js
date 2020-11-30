import React, {useState, useRef, useEffect} from 'react';
import '../Styles/headers.css';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signout } from "../auths.actions";

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    useEffect(() => {

    }, [auth.authenticate]);

    const renderNonLoggedInLinks = () =>{
        return(
            <div>
                <div className="rect"></div>
                <a href="/">
                    <div className="logos">
                    <h1 className="ee">&nbsp;e!</h1>
                    <h1 id="eat">eatigo!</h1>
                </div>
                </a>
                <div className="login">
                <a href="/login"><button type="button" className="btn btn-danger" ><i className="fas fa-sign-in-alt" />&nbsp;&nbsp;Login</button></a>    
                </div>
                <div className="account">
                <a href="/signup"><button type="button" className="btn btn-danger" ><i className="fas fa-user-plus" />&nbsp;&nbsp;Create account</button></a>
                </div>
            </div>   
        )
    }
    const renderLoggedInLinks = () =>{
        return(
            <div>
                <div className="rect"></div>
                <a href="/">
                    <div className="logos">
                     <h1 className="ee">&nbsp;e!</h1>
                    <h1 id="eat">eatigo!</h1>
                </div>
                </a>
                <div className="sign">
                <a style={{color: 'white'}}>Welcome {auth.user.firstname}! &nbsp; &nbsp;</a>
                <button type="button" className="btn btn-danger" onClick = {logout}><i className="fas fa-sign-out-alt" />&nbsp;&nbsp;Signout</button>  
                </div>
                <div className="account">
                <a href="/cart"><button type="button" className="btn btn-danger" ><i className="fas fa-shopping-cart" />&nbsp;&nbsp;Go to Cart</button></a>
                </div>
            </div>   
        )
    }

    return(
        <div>
            { auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }
        </div>
        
    )
}

export default Header;