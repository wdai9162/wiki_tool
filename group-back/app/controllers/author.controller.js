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
            var titleAndNumArray = [];

            //result.forEach(title => {
            for(let i = 0; i < result.length; i++){
                let title = result[i];
                Revinfo.find({'title':title, 'user':authorName}).then(finalResult =>{
                    if (finalResult===null) {
                        return res.status(401).json({
                            confirmation: "Failed",
                            err: "We cannot find an author with that keyword"
                        })
                    }
                    let titleAndNum = {
                        title: title,
                        ChangeTimes: finalResult.length
                    };

                    titleAndNumArray.push(titleAndNum);
                    if (i === result.length - 1){
                        return res.status(200).json({
                            confirmation: "success",
                            result: titleAndNumArray
                        });
                    }
                })
            }
        })



};

module.exports.returnArticleTimestamps = function (req, res) {
    const title = req.body.title;
    const authorName = req.body.name;

    Revinfo.find({'title': title, 'user': authorName}, {_id: 0, timestamp: 1})
        .then(result => {
            if (result === null) {
                return res.status(401).json({
                    confirmation: "Failed",
                    err: "We cannot find an article with that title"
                })
            }
            return res.status(200).json({
                confirmation: "success",
                result: result
            })
        });





};



module.exports.returnTitleAndNumber = function (req, res) {
    const name = req.body.name
    const getTitleAndNumber= [{$match: {
            user: name
        }}, {$group: {
            _id: '$title',
            sum: {
                $sum:1
            }
        }}];

    Revinfo.aggregate(getTitleAndNumber)
        .then(result => {
            res.status(200).json({
                confirmation: 'success',
                data: result,
            })
        })
        .catch(err => {
            res.json({
                confirmation:'failed',
                message: err
            })
        })
};
