const express = require('express');
const router = express.Router();
const bcrypt = require ("bcrypt"); 

const User = require("../model/user")

router.post('/signup', (req,res,next)=>{

    //hash the user password 
    bcrypt.hash(req.body.password,10).then(
        hash=> {
            const user = new User ({
                email: req.body.email,
                password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "Sign up successfully!", 
                result: result 
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        })
        
    });
});

module.exports = router;
