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
    decoded = jwt.verify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd", function (err, decoded) {
        if (err) {
            res.status(401).json({
                confirmation: "failed",
                err: err
            })
        } else {
            res.status(200).json({
                decode:decoded
            })
        }
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
    console.log(req);
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
//
module.exports.checkIfUserExists = function(req, res){
    const userEmail = req.body.userEmail;
    User.findOne({ "email" : userEmail })
        .then(result => {
            if (result === null) {
                return res.status(401).json({
                    confirmation: "Failed",
                    err: "We cannot find an account with that email address"
                })
            }
            console.log("result: " + result);
            res.status(201).json({
                confirmation: "Exists",
                email: result.email,
                question: result.question
            })
        });
}
module.exports.checkIfAnswerCorrect = function(req, res){
    const userEmail = req.body.userEmail;
    const answer = req.body.answer;
    User.findOne({"email" : userEmail})
        .then(result => {
            if (answer == result.answer){
                res.status(201).json({
                    confirmation: "Correct!",
                })
                return true;
            }else{
                res.status(401).json({
                    confirmation: "Wrong answer!",
                })
                return false;
            }
        })
}
module.exports.resetPassword = function (req, res) {
    const userEmail = req.body.userEmail;
    let newPassword = req.body.password;

    //Generate iterations of salt
    const saltRounds = 10;
    //Randomly generate salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //get hash
    var hash = bcrypt.hashSync(newPassword, salt);

    newPassword = hash;//hash new password


    console.log("hashed Password:"+newPassword);
    User.findOne({"email" : userEmail})
        .then(result => {
            console.log("old password:"+result.password);
            User.findByIdAndUpdate({_id: result._id}, {password: newPassword}, function(err, result) {
                if (err) {
                    res.status(401).json({
                        confirmation: "Failed!"
                    })
                } else {
                    res.status(201).json({
                        confirmation: "Success!"
                    })
                }
            })
        })
}
