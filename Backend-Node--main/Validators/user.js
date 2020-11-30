const {check, validationResult} = require('express-validator');

exports.validateRequest = [
    check('firstname')
    .notEmpty()
    .withMessage('firstname is required'),
    check('lastname')
    .notEmpty()
    .withMessage('lastname is required'),
    check('location')
    .notEmpty()
    .withMessage('location is required'),
    check('role')
    .notEmpty()
    .withMessage('role is required'),
    check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({min: 3})
    .withMessage("Password can't be less than 3 characters")
];

exports.validateLogRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({min: 3})
    .withMessage("Password can't be less than 3 characters")
];

exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}