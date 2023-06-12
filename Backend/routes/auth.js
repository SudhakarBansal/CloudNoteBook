const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');             //for password hashing and salt adding
const jwt = require('jsonwebtoken');            //to generate JWT token for secure connection

const JWT_secret = "Thi$i$@$ecret";             //JWT secret key

//crate a user using : POST "api/auth/createuser" No Login required  

router.post('/createuser', [
    body('name', 'Enter a valid name.').isLength({ min: 3 }),   //express Validators
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {

    //if there are errors return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        //Check whether the user exists already with same email id
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return (res.status(400).json({ error: "Sorry! the user with this Email already exists." }));
        }

        const salt = await bcrypt.genSalt(10);                              //this will generate a salt
        const secPass = await bcrypt.hash(req.body.password, salt);        //it generate a hashed passsword with salt

        //create a new uer
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        //jwt authentication 
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_secret);
        res.json({authToken});         //sending response
    }

    //catching any error if occurs...
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error : ");
    }

})

//Authenticating a user using : POST "api/auth/login" No Login required  

router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),           //express Validators
    body('password', 'Password cannot be blank.').exists()         //express Validators
], async (req, res) => {
    //if there are errors return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials." });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Please try to login with correct credentials." });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(payload, JWT_secret);
        res.json({authToken});         //sending response
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error : ");
    }

})
module.exports = router;