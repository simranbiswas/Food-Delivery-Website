import React from 'react';
import '../Styles/home.css';
import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';
import axios from 'axios';
class Home extends React.Component{
    
        constructor() {
            super();
            this.state = {
                locations: [],
                mealtype: []
            }
        }
     componentDidMount() {
         sessionStorage.setItem("city",0)
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/location',
            headers: {'Content-Type': 'application/json'}
            }).then(response =>this.setState({locations: response.data.location}))
            .catch(err => console.log(err))
    
            axios({
                method: 'GET',
                url: 'http://localhost:5000/api/mealtype' ,
                headers: {'Content-Type': 'application/json'}
                }).then(response =>this.setState({mealtype: response.data.Mealtype}))
                .catch(err => console.log(err))
    }
    render() {
        const {locations,mealtype}=this.state;
        return(
            
            <React.Fragment>
                <Wallpaper locations={locations} />
                <QuickSearch mealtype={mealtype} />
            </React.Fragment>
        )}
}

export default Home;