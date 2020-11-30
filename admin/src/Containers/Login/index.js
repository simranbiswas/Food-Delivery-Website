import React,{useState,  useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import { login} from '../../auths.actions';
import {Redirect} from "react-router-dom";

const Login= (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();


    const userLogin = (e) =>{

        e.preventDefault();
        
        const user ={
            email, password
        }
       
        dispatch(login(user));
        
        
    }

    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }
    return (
        <div class="container">
            <Form>
                    <div>
                        <div className="logoss">
                            <h1 className="ee" style={{'color':'#cf002d'}}>e!<br/></h1>
                        </div>
                        <h3 className="user">Login Admin</h3>
                    <br/>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><i className="far fa-envelope" aria-hidden="true" /></Form.Label>&nbsp;&nbsp;
                                    <Form.Control type="email" placeholder="Enter email" className="input"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><i className="fas fa-key" aria-hidden="true" /></Form.Label>&nbsp;&nbsp;
                                    <Form.Control type="password" placeholder="Password" className="input"
                                    value={password} onChange={(e) => setPassword(e.target.value)}  />
                                </Form.Group>  
                            </Form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                       <button type="button" className="btn btn-success" onClick={userLogin}>
                                    <i className="fas fa-sign-in-alt" />&nbsp;&nbsp;Login</button>&nbsp;
                        <a href="/"><button type="button" className="btn btn-danger" >
                                <i className="fas fa-window-close" />&nbsp;&nbsp;Cancel</button></a>
                    </div>  
                    </div>
                </Form>  
        </div>
    )
}

export default Login