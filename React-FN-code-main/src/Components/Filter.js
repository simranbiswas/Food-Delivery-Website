import React from 'react';
import '../Styles/search.css';
import axios from 'axios';
import queryString from 'query-string';
class Filter extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations:[],
            pageCount:[],
            location: undefined,
            cuisine:[],
            mealtype:undefined,
            hcost:undefined,
            localhost:undefined,
            sort:1,
            page:1
        }
    }
    componentDidMount() {
       const queryParams = queryString.parse(this.props.location.search);
       const mealtype_id= queryParams.mealtype;
       const location_id=queryParams.area;

       let filterObj ={};
       const {sort,page,area} = this.state;
        filterObj = {
            mealtype_id:mealtype_id,
            location_id:location_id,
            sort:sort,
            page:page,
            //area:area
    };

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantfilter',
            headers: {'Content-Type': 'application/json'},
            data: filterObj
            }).then(res =>this.setState({ 
                restaurants: res.data.restaurant,
                mealtype:mealtype_id,
                pageCount:res.data.pageCount,
                location:location_id,
               // area:area
            }))
            .catch(err => console.log(err))
         axios({
            method: 'GET',
            url: 'http://localhost:5000/api/location',
            headers: {'Content-Type': 'application/json'}
            }).then(response =>this.setState({locations: response.data.location}))
            .catch(err => console.log(err))
    }
    handleClick = (ID)=>{
        //const ID = '5fa18fae2f334707b068db7c';
        this.props.history.push(`/details/?restaurant=${ID}`)
    }
    handleLocationChange = (event) =>{
        
        const area = event.target.value.split('-')[0];
        const city = event.target.value.split('-')[1];
        const {cuisine,mealtype,hcost,lcost,page,sort} = this.state;
        let filterObj = {
            location_id:area,
            mealtype_id:mealtype,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:sort,
            page:page
        };
        this.props.history.push(`/filter?area=${area}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantfilter',
            headers: {'Content-Type': 'application/json'},
            data: filterObj
            }).then(res =>this.setState({ 
                restaurants: res.data.restaurant,
                mealtype:mealtype,
                pageCount:res.data.pageCount,
                location:area
            }))
            .catch(err => console.log(err))
    }

   /* handlePageChange = (pageNumber) =>{
        
        //const area = event.target.value.split('-')[0];
        //const city = event.target.value.split('-')[1];
        const page = pageNumber;
        const {cuisine,mealtype,hcost,lcost,sort,location} = this.state;
        let filterObj = {
            location_id:location,
            mealtype_id:mealtype,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:sort,
            page:page
        };
        this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantfilter',
            headers: {'Content-Type': 'application/json'},
            data: filterObj
            }).then(res =>this.setState({ 
                restaurants: res.data.restaurant,
                page:page,
                pageCount:res.data.pageCount,
                //location_id:area
            }))
            .catch(err => console.log(err))
    }*/
    

    /*handleCuisineChange = (cuisineid) =>{
        const {cuisine,location,mealtype,hcost,lcost,sort,page}=this.state;
        if(cuisine.idexOf(cuisineid)==-1){
            cuisine.push(cuisineid);
        }
        else{
            var index = cuisine.indexOf(cuisineid);
            cuisine.splice(index,1)
        }
        let filterObj = {
            location_id:location,
            mealtype_id:mealtype,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:sort,
            page:page
            };
            this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
     axios({
         method: 'POST',
         url: 'http://localhost:5000/api/restaurantfilter',
         headers: {'Content-Type': 'application/json'},
         data: filterObj
         }).then(res =>this.setState({ restaurants: res.data.restaurant,pageCount:res.data.pageCount,cuisine:cuisine}))
         .catch(err => console.log(err))
    }*/
    handleCuisineChange = (cuisineId) => {
        /* This function will be invoked on cuisine value change from filter page,
         and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */

        const { cuisine, location, mealtype, hcost, lcost, sort, page,area } = this.state;

        // pushing and poping the cuisines values from array
        if (cuisine.indexOf(cuisineId) == -1) {
            cuisine.push(cuisineId);
        }
        else {
            var index = cuisine.indexOf(cuisineId);
            cuisine.splice(index, 1);
        }

        // making the input object for filter API basis changed cuisine
        let filterObj = {
            location_id: location,
            mealtype_id: mealtype,
            cuisine_id: cuisine.length != 0 ? cuisine : undefined,
            hcost: hcost,
            lcost: lcost,
            sort: sort,
            page: page
        };

        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantfilter',
            headers: {'Content-Type': 'application/json'},
            data: filterObj
        })
            .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, cuisine: cuisine }))
            .catch(err => console.log(err))
    }

    onSortChange = (sort)=>{
        const {location,cuisine,lcost,hcost,mealtype,page} = this.state;
        let filterObj = {
            location_id:location,
            mealtype_id:mealtype,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:Number(sort),
            page:page
        };
        this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);    
     axios({
         method: 'POST',
         url: 'http://localhost:5000/api/restaurantfilter',
         headers: {'Content-Type': 'application/json'},
         data: filterObj
         }).then(res =>this.setState({ restaurants: res.data.restaurant,sort:Number(sort),pageCount:res.data.pageCount}))
         .catch(err => console.log(err))

    }
   /* handleCostChange = (lcost,hcost)=>{
        const {location,cuisine,mealtype,sort,page,area} = this.state;
        let filterObj = {
          location_id:area,
           mealtype_id:mealtype,
           cuisine_id:cuisine.length !=0 ? cuisine:undefined,
           lcost:Number(lcost),
           hcost:Number(hcost),
            sort:sort,
            page:page
     };
     this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
     axios({
         method: 'POST',
         url: 'http://localhost:5000/api/restaurantfilter',
         headers: {'Content-Type': 'application/json'},
         data: filterObj
         }).then(res =>this.setState({ restaurants: res.data.restaurant,pageCount:res.data.pageCount,hcost:Number(hcost),lcost:Number(lcost),mealtype:mealtype}))
         .catch(err => console.log(err))
    }*/
    handleCostChange = (lcost, hcost) => {
        /* This function will be invoked on cost filter value change from filter page,
         and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */

        const { location, cuisine, mealtype, sort, page,area } = this.state;

        // making the input object for filter API basis changed cost
        let filterObj = {
            location_id: area,
            mealtype_id: mealtype,
            cuisine_id: cuisine.length != 0 ? cuisine : undefined,
            hcost: Number(hcost),
            lcost: Number(lcost),
            sort: sort,
            page: page
        };

        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${area}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/restaurantfilter',
            headers: {'Content-Type': 'application/json'},
            data: filterObj
            })
            .then(res => this.setState({
                restaurants: res.data.restaurant,
                lcost: Number(lcost),
                hcost: Number(hcost),
                pageCount: res.data.pageCount
            }))
            .catch(err => console.log(err))
    }
    render(){
        const {restaurants,pageCount,locations,sort} = this.state;
        
       // const {locations} = this.props;
        return(
            <div>
            <div/>
        <div id="myId" className="headings">Breakfast Places in Mumbai</div>
        <div className="container-fluid">
         <div className="row">
        <div className="col-sm-6 col-sm-6">
            <div className="filtercontainer ">
                    <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                        data-target="#demo"></span>
                    <div id="demo" className="collapse show">
                        <div className="filter-heading">Filters</div>
                        <div className="Select-Location">Select Location</div>
                        <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                            <option>Select</option>
                            {locations.map((item)=>{
            return <option value={`${item.location_id}-${item.city_id}`}>{`${item.name}`}</option>
        })}
                        </select>
                        <div className="Cuisine">Cuisine</div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="checkbox" value="1" onChange={()=>this.handleCuisineChange(1)}/>
                            <span className="checkbox-items">North Indian</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="checkbox" value="2" onChange={()=>this.handleCuisineChange(2)} />
                            <span className="checkbox-items">South Indian</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="checkbox" value="3" onChange={()=>this.handleCuisineChange(3)}/>
                            <span className="checkbox-items">Chineese</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="checkbox" value="4" onChange={()=>this.handleCuisineChange(4)}/>
                            <span className="checkbox-items">Fast Food</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="checkbox" value="5" onChange={()=>this.handleCuisineChange(5)}/>
                            <span className="checkbox-items">Street Food</span>
                        </div>
                        <div className="Cuisine">Cost For Two</div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="cost" onChange={()=>this.handleCostChange('1','500')}/>
                            <span className="checkbox-items">Less than ₹ 500</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="cost" onChange={()=>this.handleCostChange('500','1000')}/>
                            <span className="checkbox-items">₹ 500 to ₹ 1000</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="cost" onChange={()=>this.handleCostChange('1000','1500')}/>
                            <span className="checkbox-items">₹ 1000 to ₹ 1500</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="cost" onChange={()=>this.handleCostChange('1500','2000')}/>
                            <span className="checkbox-items">₹ 1500 to ₹ 2000</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="cost"onChange={()=>this.handleCostChange('2000','10000')}/>
                            <span className="checkbox-items">₹ 2000 +</span>
                        </div>
                        <div className="Cuisine">Sort</div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="sort" onChange={()=>this.onSortChange('1')}/>
                            <span className="checkbox-items">Price low to high</span>
                        </div>
                        <div style={{'display': 'block','padding-left':'20px'}}>
                            <input type="radio" name="sort" onChange={()=>this.onSortChange('-1')}/>
                            <span className="checkbox-items">Price high to low</span>
                        </div>
                    </div>
                </div>
                
            </div>
            
                {restaurants.length > 0 ? restaurants.map((item) => {
                    return  <div className="Item" onClick={() => this.handleClick(item._id)}>
                     <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-4">
                        <img class="imgs" src={item.thumb} alt="" />
                    </div>
                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="rest-name">{item.name}</div>
                        <div class="res-location">FORT</div>
                        <div class="rest-address">{item.address}</div>
                    </div>
                    <hr className="hr"/>
                    <div class="row padding-left">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="rest-address1">CUISINES : Bakery</div>
                        <div class="rest-address1">COST FOR TWO :{item.min_price} </div>
                    </div>
                </div>
                </div> 
                </div>
                
   
                }) : <div>No data found</div> }
          
           </div>
   
    
     <div className="pagination">
                        <a href="#">&laquo;</a>
                        {pageCount.map((item)=>{
                            return  <a href="#">{item}</a>
                        })}
                       
                        
                        <a href="#">&raquo;</a>
                    </div>
    
    <button onClick={this.Navigate}>Navigate to details</button>
            </div>
           </div> 
        )
    }
}

    

export default Filter;