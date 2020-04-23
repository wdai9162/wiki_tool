/**
 * user.controller.js
 *
 * This controller module exposes 
 *  - 
 *
 */

const express = require ('express');
const User = require ('../model/user'); 

const bcrypt = require ("bcrypt"); 

module.exports.login = function (req, res) {

    res.json({
        message: success, 
        data: "this is the user login end point"
    })

}

/*

module.exports.signup = function (req, res) {

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

*/