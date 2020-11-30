const express = require('express');
var cityController = require('../Controllers/city');
var mealTypeController = require('../Controllers/Mealtype');
var restaurantController = require('../Controllers/Restaurant');
var userController = require('../Controllers/User');
var cartController = require('../Controllers/Cart');
var orderController = require('../Controllers/Order');
var adminController = require('../Controllers/admin/Admin');
const { validateRequest, isRequestValidated, validateLogRequest } = require('../Validators/user');
const {getFoodById} = require('../Controllers/Food');

const router =express.Router();

router.get('/location',cityController.getLocation);
router.get('/mealtype',mealTypeController.getMealType);
router.post('/restaurantfilter',restaurantController.filterSearch);
router.get('/getRestaurantbycity/:cityName',restaurantController.getRestaurantbycity);
router.get('/getResbyId/:restID',restaurantController.getRestaurantbyID);
router.post('/signup',validateRequest,isRequestValidated, userController.signup);
router.post('/login', validateLogRequest, isRequestValidated, userController.login);
router.post('/admin/signup', adminController.signup);
router.post('/admin/login', validateLogRequest, isRequestValidated, adminController.login);
router.post('/signout', userController.requireSignin, userController.signout );
router.post('/cart',userController.requireSignin,userController.userMiddleware,cartController.addItemToCart);
router.get('/food/:food_id', getFoodById);
router.post("/addOrder", userController.requireSignin, userController.userMiddleware, orderController.addOrder);
router.get('/checkout',cartController.addItemToCart );

module.exports = router;