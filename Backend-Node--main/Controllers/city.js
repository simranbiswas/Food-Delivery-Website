const { response } = require('express');
const city = require('../Models/City');

exports.getLocation = (req,res) =>{
        city.find().then(response =>{
                res.status(200).json({message:"Location fetched Successfully",location:response})
        })
        .catch(err=> {
                res.status(500).json({ message:err})
        })
}