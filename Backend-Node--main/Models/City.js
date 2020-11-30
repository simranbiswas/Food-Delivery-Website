const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CitySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    city_id:{
        type: Number,
        required: true
    },
    location_id:{
        type: Number,
        required: true
    },
    city:{
        type: Number,
        required:true
    },
    country_name:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('city',CitySchema);