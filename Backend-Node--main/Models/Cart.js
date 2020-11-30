const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cartItems:[
        {
            food_id: {
                type: mongoose.Schema.Types.ObjectId,
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
            }
        }
    ]
},
{timestamps: true});

module.exports = mongoose.model('cart',CartSchema);