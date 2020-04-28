/**
 * user.controller.js
 *
 * This controller module exposes
 *  -
 *
 */

const User = require ('../model/user');
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.login = function (req, res) {

    const userEmail = req.body.userEmail;
    const userPsd= req.body.password;
    let user;


    //query database for the login email submitted
    User.findOne({ "email" : userEmail })
    .then(result => {
        if (result===null) {
            return res.status(401).json({
                confirmation: "Login Failed",
                err: "We cannot find an account with that email address"
            })
        }
        //load user email prior to exit this context
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
        //if logged in successful, create JWT token for respsone
        var token = jwt.sign(
            { user: user },
            'thisisgroup6wikiprojectforcomp5347webapplicationusyd',
            { expiresIn: '1h'});

        //return result if not password check is true
        return res.status(200).json({
            confirmation: "success",
            user: user,
            jst: token
        })

    })
}
module.exports.LoginStatus = function (req, res) {

    if(req.headers.authorization)
{
    const token = req.headers.authorization
    console.log(token)
    decoded = jwt.verify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd", function (err, decoded) {
        if (err) {
            res.status(401).json({
                // confirmation: "failed",
                // message: "Invalid token!"
                err: err
            })


        } else {
            res.status(200).json({
                decode:decoded
            })

        }// bar
    }
    )
}
else
{

    res.status(200).json({
        err: "error"
    })
}

};

module.exports.signup = function (req, res) {

    //hash the user password
    bcrypt.hash(req.body.password,10).then(
        hash=> {
            const user = new User ({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                question: req.body.question,
                answer: req.body.answer
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
