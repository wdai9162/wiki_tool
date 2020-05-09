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
module.exports.returnAllAuthorNames = function (req, res) {

    Revinfo.find({},{user:1, _id:0})
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

module.exports.returnAuthorArticleAndNum = function (req, res) {
    const authorName = req.body.name;

    Revinfo.distinct('title',{'user':authorName})
        .then(result => {
            if (result===null) {
                return res.status(401).json({
                    confirmation: "Failed",
                    err: "We cannot find an article with that author name"
                })
            }
            return res.status(200).json({
                confirmation: "success",
                result: result,
                number: result.length
            })
        })


};

module.exports.returnArticleTimestamps = function (req, res) {
    const title = req.body.title;
    const authorName = req.body.name;

    Revinfo.find({ 'title': title, 'user': authorName},{_id:0, timestamp:1})
        .then(result => {
            if (result===null) {
                return res.status(401).json({
                    confirmation: "Failed",
                    err: "We cannot find an article with that title"
                })
            }
            return res.status(200).json({
                confirmation: "success",
                result: result
            })
        })


};
