import React,{useState, useRef, useEffect} from 'react'
import Header from "../../Components/Header";
import axios from 'axios';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


class Checkout extends React.Component {
  constructor() {
        super();
        this.state = {
           cart : {},
           cartItems:[],
            restaurant : {},
           cuisine:[]
           
        }
    }
    

    componentDidMount() {
      axios.get('http://localhost:5000/api/checkout')
        .then(res => {
            this.setState({ 
                cart: res.data.carts,
                cartItems: res.data.carts.cartItems,
                
            })
        })
        .catch(err => console.log(err))
    }

  render() {
    const {cart, cartItems} = this.state;
    return(
        <div className="col-md-12" >
            { this.state.cartItems.map(Data=>( 
                <h3>{Data.food_id}&nbsp;</h3>
            ))}
            <h2>{cart.user}</h2>
            <div className="row">
                <img src={require('../../image/orderc.svg')} id="ch"/>
             </div>
             <div className="col-4 offset-4" style={{'text-align':'center'}}>
                 <div className="row justify-content-center" >
                    <h3 >Order Confirmed!</h3>
                </div>
                <div className="row justify-content-center">
                    <h5>Your food will reach to you in 30-45 minutes. </h5>
                </div><br/>
                <div className="row justify-content-center">
                    <h5>Customer Care: +22846947</h5>
                </div><br/>
                <div className="row justify-content-center">
                    <a href='/'><Button variant="danger">Back To Main Page</Button></a>
                </div>
            </div>   
        </div>
        
    )
    
    }
}
export default Checkout;