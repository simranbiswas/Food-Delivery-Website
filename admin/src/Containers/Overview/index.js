import React, {useState} from 'react';
import queryString from 'query-string';
import './deets.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRatings from 'react-star-ratings';


class Details extends React.Component{
    constructor() {
        super();
        this.state = {
           restaurant : {},
           cuisine:[],
           show: false
        }
    }
    componentDidMount() {
        
        const queryParams = queryString.parse(this.props.user.res_id)
        const restaurantid =queryParams.restaurant;;
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/getResbyId/' + restaurantid,
            headers: {'Content-Type': 'application/json'}
            }).then(res =>this.setState({ 
                restaurant: res.data.restaurant,
                cuisine: res.data.restaurant.cuisine
        }))
            .catch(err => console.log(err))

    }
    
    render(){
        
        const {restaurant, cuisine, show} = this.state;
        

        return(
           <body id="bg">
           <div className="sidebar text-center">
                <a href="/">Home</a>
                <a href="/orders">Orders</a>
                <a class="active" href="/res">About</a>
            </div>
            <div className="container-fluid" id="deets">
                
                <div className="row" id="slider">
                    <div className="col-md-4 offset-2 "><br/>
                        <img src={restaurant.thumb} id="thumb" />
                    </div>
                    <div className="col-md-6" id="rest">
                        
                        <h1 id="heading" ><b>{restaurant.name}</b></h1><br/>
                        <h5 >Address: {restaurant.address}<br/>
                        {restaurant.locality}, Contact: {restaurant.contact_no}</h5><br/><br/>
                        <h5>Rating: &nbsp;{restaurant.aggregate_rating}&nbsp;<StarRatings
                            rating={restaurant.aggregate_rating}
                            starDimension="30px"
                            starSpacing="5px"
                            starRatedColor="gold"
                        />&nbsp;&nbsp;|&nbsp;&nbsp;<i>{restaurant.rating_text}</i></h5><br/>
                        
                    <br/>
                    </div>
                    <br/>
                </div> <br/>
                <div className="row"><br/>
                    <div className="col-md-6 offset-3" >
                        { this.state.cuisine.map(Data=>(
                                
                                <div className="row justify-content-center" id="dish">
                                    
                                    <div className="col-md-5">
                                        <h3>{Data.name}&nbsp;&nbsp;&nbsp;
                                        <h5><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-nut-fill" fill={Data.col} xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.58 1a1 1 0 0 0-.868.504l-3.429 6a1 1 0 0 0 0 .992l3.429 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.428-6a1 1 0 0 0 0-.992l-3.428-6A1 1 0 0 0 11.42 1H4.58zm5.018 9.696a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z"/>
                                            </svg></h5>
                                        </h3>
                                        <h4>&#8377; {Data.price}</h4>
                                        <h6 id="desc">{ Data.description}</h6>
                                        <h6><b>Serves</b>: {Data.serves}</h6>
                                    </div>
                                    <div className="col-md-3">
                                        <img src={Data.thumb} style={{'height': '200px','width':'220px',
                                         padding: '20px','border-radius':'25%'}}/>
                                    </div>
                                   
                                </div>
                            
                        ))
                    }
                    </div>
                </div><br/> 
                
            </div>
            </body>
            
        )
    }
}
export default Details;