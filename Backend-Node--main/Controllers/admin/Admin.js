const User = require('../../Models/User');
const jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
        User.findOne({ email: req.body.email })
        .exec((error, user) => {
                if(error) return res.status(400).json({ error });
                if(user){

                if(user.authenticate(req.body.password) && user.role === 'admin'){
                        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d' });
                        const { _id, firstname, lastname, email, role } = user;
                        res.cookie('token', token, {expiresIn: '1d'});
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
        /*
        User.find({email:email,password:password})
        .then(result =>{
                if (result.length >= 1){ 
                res.status(200).json({message:"User loggedIn Successfully",isAuthenticated:true,user:result})}
                else{
                        res.status(200).json({message:"User not loggedIn Successfully",isAuthenticated:false,user:result})
                }
         
        }).catch(err=> {
                res.status(500).json({ message:err})
        })*/
       
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
exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: 'Admin access denied' })
    }
    next();
}
exports.signout = (req,res) => {

        res.clearCookie('token');
        res.status(200).json({
                message: 'Signout Successfully'
        });

};
