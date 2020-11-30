const restaurant = require("../Models/Restaurant");


exports.getFoodById = (req, res) => {
  const { food_id } = req.params;
  if (food_id) {
    restaurant.cuisine.findOne({ _id: food_id }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};