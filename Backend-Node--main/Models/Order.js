const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    user_name:{
        type: String,
        ref: 'users',
        required: true
    },
    location:{
        type: String,
        ref: 'users',
        required: true
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    food_name: {
        type: String,
        ref: 'Restaurant',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },

},
);

module.exports = mongoose.model('orders',orderSchema);