

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const RestaurantSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
   location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
	
    thumb: {
        type: String,
        required: true
    },
    aggregate_rating: {
        type: Number,
        required: true
    },
    rating_text: {
        type: String,
        required: true
    },
	min_price: {
        type: Number,
        required: true
    },
	 contact_no: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    mealtype_d: {
        type: Number,
        required: true
    },
    cuisine: [{
        food_id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumb: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        serves: {
            type: String,
            required: true
        },
        col: {
            type: String,
            required: true
        }

    }],
     cuisine_id: {
        type: Array,
        required: true
    }
    
    
})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.restaurant || mongoose.model('restaurant', RestaurantSchema);