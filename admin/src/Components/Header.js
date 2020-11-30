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
    
    const renderNonLoggedInLinks = () =>{
        return(
            <div>
                <div className="rect"></div>
                <a href="/">
                    <div className="logos">
                    <h1 className="ee">e!</h1>
                </div>
                </a>
                <div className="login">
                <a href="/login"><button type="button" className="btn btn-danger" >Login</button></a>    
                </div>
                <div className="account">
                <a href="/signup"><button type="button" className="btn btn-danger" >Create account</button></a>
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
                    <h1 className="ee">e!</h1>
                </div>
                </a>
                <div className="login">
                <button type="button" className="btn btn-danger" onClick = {logout}>Signout</button>  
                </div>
                <div className="account">
                <a href="/cart"><button type="button" className="btn btn-danger" >Go to Cart</button></a>
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