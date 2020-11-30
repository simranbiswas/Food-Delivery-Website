import React from 'react'
import Header from "../../Components/Header";
import axios from 'axios';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { getOrder } from "../auths.actions";


class Cart extends React.Component {
  constructor() {
        super();
        this.state = {
           cart : {},
           cartItems:[],
           restaurant : {},
           cuisine:[],
           user: {}
           
        }
    }
    order = () => {
        dispatch(getOrder());
    }
  componentDidMount() {
      axios.post('http://localhost:5000/api/cart')
        .then(res => {
            this.setState({ 
                cart: res.data.carts,
                cartItems: res.data.carts.cartItems,
                restaurant: res.data.restaurant,
                cuisine: res.data.restaurant.cuisine,
                user: res.data.users
            })
        })
        .catch(err => console.log(err))
  }

  render() {
    const {cart, cartItems} = this.state;
    return(
        <div className="col-md-12" >
            <h2 style={{'text-align':'center', color: '#cf002d'}}>Cart Items</h2><br/>
            { this.state.cartItems.map(Data=>( 
                <h3>{Data.food_id}&nbsp;</h3>
            ))}
            <h2>{cart.user}</h2>
            <div className="row">
                <div className="col-2">
                    <img src={require("../../image/cook.svg")} id="art"/>
                </div>
                <div className="col-3">
                     <img src={require({Datathumb})} alt="biryani" id="img"></img>
                </div>
                <div className="col-5">
                    <h3>{Data.name}</h3><br/>
                    <h5>{Data.description}</h5><br/><br/>
                    <h4>Price: &#8377; {Data.price}&nbsp;&nbsp;&nbsp; Qty: {Data.quantity}</h4><br/>
                </div>
                <div className="col-2">
                    <img src={require("../../image/ac.svg")} id="art"/>
                </div>
            </div><hr/>
            <div className="row">
                <div className="col-3 offset-2" style={{'text-align':'center'}}>
                    <h3>Total Cost:</h3>
                </div>
                <div className="col-5">
                    <h3 style={{color: '#cf002d'}}>&#8377; 890</h3>
                </div>
            </div><hr />
            <div className="row">
                <div className="col-3 offset-2" style={{'text-align':'center'}}>
                    <h4 >Deliver to: </h4>
                    <h4 >Name: </h4>
                    <h4 >Payment:</h4>
                </div>
                <div className="col-5">
                    <h4 style={{color: '#cf002d'}}>{user.location}</h4>
                    <h4 style={{color: '#cf002d'}}>{user.firstname}&nbsp; {user.lastname} </h4>
                    <h4><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked/> 
                        <label class="form-check-label" for="exampleRadios2">&nbsp;&nbsp;&nbsp;Cash on Delivery</label></h4>
                </div>
                
            </div>   <hr/>
            <div className="row">
                <div className="col-4 offset-4">
                    <a href="/checkout"><Button variant="success" onClick={order}>
                    <i className="fas fa-cart-arrow-down" />&nbsp;&nbsp;Proceed To Checkout
                    </Button></a> 
                </div> 
            </div>  
             <br/><br/>
        </div>
        
    )
    
    }
}
export default Cart;