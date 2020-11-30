const MealType = require('../Models/Mealtype');

exports.getMealType = (req,res) =>{
        MealType.find().then(response =>{
                res.status(200).json({message:"Mealtype fetched Successfully",Mealtype:response})
        })
        .catch(err=> {
                res.status(500).json({ message:err})
        })
}