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
    

    const usrEmail = "testuser@gmail.com" || req.userEmail;
    const userPsd= "Welcome1" || req.password;
    let user;

    //query database for the login email submitted
    User.findOne({ "email" : usrEmail })
    .then(result => {
        if (result===null) {
            return res.status(401).json({
                confirmation: "Login Failed",
                err: "We cannot find an account with that email address"
            })
        }
        user = result.email;
        
        //compare password and return true of false 
        return bcrypt.compare(userPsd, result.password);
    })
    .then (result => {
        if (result===false) {
            return res.status(401).json({
                confirmation: "Login Failed",
                err: "Incorrect password"
        })}

        //return result if not password check is true 
        return res.status(200).json({
            confirmation: "success",
            user: user,
            session: req.session
        })
        
    })    
}

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
};
