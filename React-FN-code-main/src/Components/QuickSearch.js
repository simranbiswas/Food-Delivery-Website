import React from 'react';
import '../Styles/home.css';
import QuickSearchItem from './QuickSearchItem';
class QuickSearch extends React.Component{
    Navigate = ()=>{
        this.props.history.push("Filter");
    }
    render() {
        const {mealtype} = this.props;
        return( 
    <div>
              
    <h1 className="Quick-Searches">Quick Searches</h1><br/><br/>
    <h2 className="meal">Discover restaurants by type of meal</h2>
        <div className="container-fluid">
            <div className="row">
            {mealtype.map((items)=>{
                    return <QuickSearchItem id={items.id} name={items.name} content={items.content} image={items.image}/>
            })}
            
            
        </div>  
        
            </div>
            </div>
           )
        }
}

export default QuickSearch;