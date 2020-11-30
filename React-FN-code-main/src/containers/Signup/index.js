import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { signup } from '../../auths.actions';

const Signup = (props) => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setloc] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    

    const userSignup = (e) => {

        e.preventDefault();

        const user = {
            firstname, lastname, email, password, location, role
        }

        dispatch(signup(user));
    }

   if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    if(user.loading){
        return <p>Loading.....</p>
    }

    return (
        <div class="container">
            {user.message}
            <div className="row justify-content-center box">
                <Form onSubmit={userSignup}>
                <div className="col-12">
                    <div className="row justify-content-center">
                        <h2>Welcome to <span id="lo">eatigo!</span></h2>
                     </div>
                    <div className="row justify-content-center">
                         <h4>Fill in the details</h4>
                    </div><br/>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group controlId="">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" rows={1} placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                             <Form.Group controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Location" value={location} onChange={(e) => setloc(e.target.value)}/>
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Role (Type user)</Form.Label>
                                <Form.Control type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <div className="row justify-content-center">
                        <Button variant="primary" type="submit">
                            <i className="fas fa-check" />&nbsp;&nbsp;Submit
                        </Button>
                    </div>
                </div>
                </Form>
         
            </div>    
        </div>
        
    )
    }
    


export default Signup