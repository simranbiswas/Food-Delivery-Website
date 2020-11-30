import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class Wallpaper extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            suggestions:[],
            text: '',
            restaurants:[]
        }
    }
    onTextChange = (e) => {
        const value = e.target.value;
        const {restaurants} = this.state;
        let suggestions = [];

        if(value.length > 0){
        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        }
        
        this.setState(()=>({
            suggestions:suggestions,
            text:value
        }))
    }

    selectedText(itemObj){
        this.setState({
            text:itemObj.name,
            suggestions: [],
        }, ()=>{
            this.props.history.push(`/details/?restaurant=${itemObj._id}`);
        })
    }
    renderSuggestions = () =>{
        let {suggestions} = this.state;
        if (suggestions.length === 0){
            return null;
        }
        return(
            <ul>
                {
                    suggestions.map((item,index)=> (<li className="lii" key={index} onClick={()=> this.selectedText(item)}>{item.name}</li>))
                }
            </ul>
        );

    }
    handleChange = (event) =>{
        const area = event.target.value.split('-')[0];
        const city = event.target.value.split('-')[1];
        sessionStorage.setItem('area',area);
        sessionStorage.setItem('city',city);
        
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getRestaurantbycity/${area}`,
            headers: {'Content-Type': 'application/json'}
            }).then(response =>this.setState({ restaurants: response.data.restaurantList}))
            .catch(err => console.log(err))
        

    }
    render() {
        const {locations} = this.props;
        const {text} = this.state;
        return(
        <div>
              <img src={require('../image/Home.png')} className="image" style={{width:'100%', height:'450px'}} alt="" />
        <div className="logo">
            <h1 className="e">e!</h1>
        </div>
    <div className="heading">Find the best restaurants, cafes, and bars</div>
    <div>
    <select className="dd" onChange={this.handleChange}>
        <option value="0">Select</option>
        {locations.map((items,index)=>{
            return <option key={index} value={`${items.location_id}-${items.city_id}`}>{`${items.name}`}</option>
        })}
    </select>
    </div>
    <div >
        <input className="dd2" type="text" placeholder="Search for restaurants" onChange={this.onTextChange} value={text}/>
        {this.renderSuggestions()}
    
        <span className="fas fa-search" id="search"></span>
      
       
    </div>
    
            
            </div>
        )}
}

export default withRouter(Wallpaper);