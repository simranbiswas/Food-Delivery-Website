import React,{useState,  useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import { login} from '../../auths.actions';
import {Redirect} from "react-router-dom";
import './styles.css';

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
            <div className="col-12">
                <div className="row justify-content-center">
                    <h2 id="title">Hungry? <span id="lo">eatigo!</span> got you covered!<br/></h2>
                </div><br/>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={require("../../image/acc.svg")} id="art"/>                                
                            </div>
                            <div className="col" id="cap1">
                                <h4 className="cap"><span id="step">Step 1:</span> <br/>Create an Account and get started</h4>
                            </div>
                            <div className="col-md-3">
                                <img src={require("../../image/lo1.svg")} id="art"/>
                            </div>
                            <div className="col ml-auto" id="cap2">
                                <h4 className="cap"><span id="step">Step 2:</span><br/>Get a wide range of eateries to choose from</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" id="cap3">
                                <h4 className="cap"><span id="step">Step 3:</span><br/>Our trusted employees will deliver your food safely</h4>
                            </div>
                            <div className="col-md-3 ml-md-auto">
                                <img src={require("../../image/way.svg")} id="art"/>
                            </div>
                            <div className="col ml-auto" id="cap4">
                                <h4 className="cap"><span id="step">Step 4:</span><br/>Pay cash on delivery and get food delivered at your doorstep!</h4>
                            </div>
                            <div className="col-md-3 ml-md-auto">
                                <img src={require("../../image/food.svg")} id="art"/>
                            </div>
                        </div>
                    </div>
                    <div className="col offset-1">
                        <div className="row justify-content-center">
                            <h3 className="user">Login </h3>
                            <h6 className="user" style={{'color':'#CF002D'}}>Hey old friend, welcome back!</h6>
                        </div>
                            <br/>
                        
                        <div className="row justify-content-center">                     
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
                            </Form></div>
                            <div className="row justify-content-center">
                                <button type="button" className="btn btn-success" id="lob" onClick={userLogin}>
                                    <i className="fas fa-sign-in-alt" />&nbsp;&nbsp;Login</button>&nbsp;
                            </div><br/>
                            <div className="row justify-content-center">
                                <h6>New Here? Try signing up first <i className="far fa-hand-point-down" /></h6>
                            </div> 
                            <div className="row justify-content-center">
                                <a href="/signup"><button type="button" className="btn btn-danger" >
                                    <i className="fas fa-user-plus" />&nbsp;&nbsp;Create account</button></a>
                            </div>        
                        </div>
            </div>

            </div>
             
        </div>
    )
}

export default Login