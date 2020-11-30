import React from 'react';
import QuickSearch from './QuickSearch';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class QuickSearchItem extends React.Component{
    handleClick = (id) =>{
        const mealtype=id;
        const city = sessionStorage.getItem('city');
        const area= sessionStorage.getItem('area');
        this.props.history.push(`/filter/?mealtype=${mealtype}&area=${area}&city=${city}`);
    }
    render(){
        const {id,name,content,image} = this.props;
        return(
            <div className="card" style={{width: 20 + 'rem' }} onClick={() => this.handleClick(id)}>
              <img className="card-img-left" src={require("../" + image)} />
                <div className="card-body">
                  <h4 className="card-title">{name}</h4>
                    <h5 className="card-text">{content} </h5>
                </div>
            </div> 

           
        )
    }
}
export default withRouter(QuickSearchItem);

/*
<div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                       <div> <img src={require("../" + image)}  className="img" alt=""/></div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <div className="col">
                            <div className="row-sm-6 row-md-6 row-lg-6">
                                <h3 className="xyz">{name}</h3>
                            </div>
                            <div className="row-sm-6 row-md-6 row-lg-6">
                                <h4 className="bf1">{content}</h4>
                            </div>
                            
                        </div>
                      
                     </div>

                </div>*/