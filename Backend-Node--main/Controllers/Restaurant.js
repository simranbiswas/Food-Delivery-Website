const Restaurant = require('../Models/Restaurant');  // importing the Restaurant Model

// filter function to filter the data based on multiple params
exports.filterSearch = (req, res, next) => {
    const queryParams = req.body;   // capturing all the params from request body

    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;    // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {};   // Initializing the payload to request

    // Initializing the payload object for quering the DB
    
    if (mealtype_id) {
        payload = {
           mealtype_id: Number(mealtype_id),
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (mealtype_id && location_id) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            'cuisine_id.cuisine_id': {$in :cuisine_id},
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id) {
        payload = {
            location_id: Number(location_id),
            'cuisine_id.cuisine_id': {$in :cuisine_id},
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            'cuisine_id.cuisine_id': {$in :cuisine_id},
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    Restaurant.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];
        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length })
    }).catch(err => {
        res.status(200).json({ message: err })
    });
}

/*const Restaurant = require('../Models/Restaurant');
exports.filterSearch = (req, res, next) => {
    const queryParams = req.body;
    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;
    const sort = queryParams.sort ? queryParams.sort : 1;
    
    let start;
    let end;
    start = Number(page * 2) - 2;
    end = Number(page * 2);
    let payload = {}
     if(mealtype_id){
         payload ={
             mealtype_id : Number(mealtype_id)
         }
    }
    if(mealtype_id && hcost && lcost){
        payload ={
            mealtype_id : Number(mealtype_id),
            min_price:{ $gt: lcost, $lt: hcost}
        }
   }
   if(mealtype_id && location_id){
    payload ={
        mealtype_id : Number(mealtype_id),
        location_id : Number(location_id)
        }
    }
    if(mealtype_id && cuisine_id){
        payload ={
            mealtype_id : Number(mealtype_id),
            cuisine_id : Number(cuisine_id)
        }
   }
   if(mealtype_id && location_id && cuisine_id){
    payload ={
        mealtype_id : Number(mealtype_id),
        location_id : Number(location_id),
        cuisine_id : Number(cuisine_id)
        }
    }
    if(mealtype_id && location_id && cuisine_id && hcost && lcost){
        payload ={
            mealtype_id : Number(mealtype_id),
            location_id : Number(location_id),
            cuisine_id : Number(cuisine_id),
            min_price:{ $gt: lcost, $lt: hcost}
        }
    }
    Restaurant.find(payload).sort({ min_price: sort}).then(result => {
        const count = result.length / 2;
        const resultvalues = result.slice(start,end);
        res.status(200).json({ message: "Restaurant Fetched Successfully", Restaurant : resultvalues, pageCount: Math.ceil(count) })
    }).catch(err => console.log(err));
}*/


/*exports.getRestaurantbycity = (req,res) => {
        const cityName = req.params.cityName;
        const result = Restaurant.filter(item =>item.city==cityName);
        res.status(200).json({message: "Restaurnat Fetched Successfully", Restaurant: result})
        
        
}*/
exports.getRestaurantbycity = (req, res) => {
    const cityName = req.params.cityName;
    Restaurant.find({ location_id: cityName }).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurantList: result })
	})  .catch(err => {
        res.status(500).json({ message: err })
    })
}
/*exports.getRestaurantbyID = (req,res,next) => {
    const restID = req.params.restID;
    const result = Restaurant.find(item =>item.id==restID);
    res.status(200).json({message: "Restaurnat Fetched Successfully", Restaurant: result})
    
}*/
exports.getRestaurantbyID = (req, res, next) => {
    const resId = req.params.restID;
    
    Restaurant.findById(resId).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}
