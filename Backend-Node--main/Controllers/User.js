const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');

exports.login = (req,res) =>{
        User.findOne({ email: req.body.email })
        .exec((error, user) => {
                if(error) return res.status(400).json({ error });
                if(user){

                if(user.authenticate(req.body.password) && user.role === 'user'){
                        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
                        const { _id, firstname, lastname, email, role } = user;
                        res.cookie('token', token, {expiresIn: '1h'});
                        res.status(200).json({
                        token,
                        user: {_id, firstname, lastname, email, role, }
                        });
                }else{
                        return res.status(400).json({
                        message: 'Something went wrong'
                        })
                }

                }else{
                return res.status(400).json({error});
                }
        });
       
}


exports.signup = (req,res,next) =>{

        User.findOne({ email: req.body.email })
        .exec((error, user) => {
                if(user) return res.status(200).json({
                        message: 'User already registered'
                });
                const{
                        firstname,
                        lastname,
                        email,
                        location,
                        role,
                        password
                } = req.body;
                const _user = new User({
                        firstname,
                        lastname,
                        email,
                        location,
                        role,
                        password
                });
                _user.save((error, data) => {
                        if(error){
                                return res.status(200).json({
                                        error
                                });
                        }
                        if(data){
                                return res.status(200).json({
                                        message: "User Account Created Successfully!"
                                })
                        }
                });
        })
}
        /*
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const role = req.body.role;
        const SignInUser = new User({email:email,password:password,firstname:firstname,lastname:lastname, role:role}
 );
 SignInUser.save().then(result =>{
                res.status(200).json({message:"User SignedUp Successfully",user:result})
        })
        .catch(err=> {
                res.status(500).json({ message:err})
        })*/

exports.requireSignin = (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }else{
        return res.status(400).json({ message: 'Authorization required' });
    }
    next();
    //jwt.decode()
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({ message: 'User access denied' })
    }
    next();
}

exports.signout = (req,res) => {

        res.clearCookie('token');
        res.status(200).json({
                message: 'Signout Successfully'
        });

};

