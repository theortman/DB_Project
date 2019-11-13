/*jshint esversion: 8 */
const router = require('express').Router();
const User = require('../model/user');
const{register_validation,login_validation} = require('../validation');
const bcrypt = require('bcryptjs');
const iwt = require('jsonwebtoken');

//VALIDATION
// const joi = require('@hapi/joi');

// const schema = joi.object({
//     name: joi.string().min(3).max(50).required(),
//     lastName: joi.string().min(3).max(50).required(),
//     DOB: joi.date().required(),
//     gender: joi.string().max(1).min(1).required(),
//     email: joi.string().required().email(),
//     password: joi.string().min(8).max(1024).required(),
//     phoneNo: joi.string().min(10).max(15).required(),
//     street: joi.string().required(),
//     city: joi.string().required(),
//     state: joi.string().max(2).required(),
//     zip: joi.string().required()
// });



router.post('/register', async (req, res) => {
    // const { error} = joi.validate(req.body,schema);

    // data validation before making a user
    const { error} = register_validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // checking if user is already in the DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
   
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
   
    // creating a new useer
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        DOB: req.body.DOB,
        gender: req.body.gender,
        email: req.body.email,
        password: hashPassword,
        phoneNo: req.body.phoneNo,
        street: req.body.state,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });
    try {
        const savedUser = await user.save();
        res.send({user: user.id});
        
    } catch (error) {
        res.statusCode(400).send(error);
    }
});

// login
router.post('/login', async (req, res) => {
    // const { error} = joi.validate(req.body,schema);

    // data validation before making a user
    const { error} = login_validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // checking if email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('invalid password');

    //create and assign token
    const token = jwt.sign({id: user.id},process.env.TOKENKEY);
    res.header('auth-token', token).send(token);
    //res.send('logged in!');
});

module.exports = router;