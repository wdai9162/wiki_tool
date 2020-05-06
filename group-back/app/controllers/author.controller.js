/**
 * author.controller.js
 *
 * This controller module exposes
 *  -
 *
 */

const Revinfo = require ('../model/revinfo');
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.returnAuthorNames = function (req, res) {

    const keyword = req.body.keyword;
    const reg = new RegExp(keyword, 'i');
    let revinfo;

    Revinfo.find( { 'user': { $regex: keyword, $options: 'i' }}, {user:1, _id:0})
        .then(result => {
            if (result===null) {
                return res.status(401).json({
                    confirmation: "Failed",
                    err: "We cannot find an author with that keyword"
                })
            }
            return res.status(200).json({
                confirmation: "success",
                result: result
            })
        })
};
