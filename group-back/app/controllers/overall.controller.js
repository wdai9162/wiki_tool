/**
 * overall.controller.js
 *
 * This controller module exposes three methods:
 *  - sendOverallStats is used for sending the overall statistic data
 *  - sendBarChartData is used for sending the data to graph a bar chart, describing revision number distribution by year and by user
 *  - sendPieChartData is used for sending the data to graph a pie chart, describing revision number distribution by user type ('Administrator', 'Anonymous', 'Bot' and 'Regular user')
 *
 */

const express = require ('express');
const Revinfo = require ('../model/revinfo');  //all articles
const fs = require ('fs');
const path = require('path');


//import bot user filter file
var botUser = fs.readFileSync(path.join(__dirname,  '/../user_filter/bots.txt')).toString().split("\n");

module.exports.byRevNumbers = function (req, res) {
    //extract user selection of the number of how many highest/lowest results to view
    //const queryNumber = req.body.userSelection;

    const queryNumber = parseInt(req.query.number);

    //Return sorted count of total revisions of each article, top 2 and bottom 2 are needed
    const queryByRevNumber = [
        {
            $group : {
                 _id : "$title",
                 count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]

    Revinfo.aggregate(queryByRevNumber)
    .then(result => {
        res.status(200).json({
            confirmation: 'success',
            number_queried: queryNumber,
            highest: result.slice(0,queryNumber),
            lowest: result.slice(queryNumber*-1),
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}

module.exports.byRegUsers  = function (req, res) {
    //extract user selection of the number of how many highest/lowest results to view
    //const queryNumber = req.body.userSelection;
    const queryNumber =parseInt(req.query.number);;

    //The top two articles edited by the largest group of registered users (non bots) and their group size.
    //Each wiki article is edited by a number of users, some making multiple revisions.
    //The number of unique users is a good indicator of an article’s popularity.
    const queryByRegUsers = [
        {
            "$group" : {
                "_id" : {
                    "title" : "$title",
                    "user" : "$user"
                },
                "title" : {
                    "$first" : "$title"
                },
                "user" : {
                    "$first" : "$user"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "title" : "$title"
                },
                "users" : {
                    "$push" : {
                        "user" : "$user"
                    }
                }
            }
        },
        {
            "$project" : {
                "users" : {
                    "$size" : {
                        "$filter" : {
                            "input" : "$users",
                            "as" : "users",
                            "cond" : {
                                "$not" : {
                                    "$in" : [
                                        "$$users.user",
                                        botUser
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        { "$sort": { "users": -1 } }
    ]

    Revinfo.aggregate(queryByRegUsers)
    .then(result => {
        res.status(200).json({
            confirmation: 'success',
            number_queried: queryNumber,
            largest: result.slice(0,queryNumber),
            least: result.slice(queryNumber*-1),
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}

module.exports.byArticleHistory = function (req, res) {
    //extract user selection of the number of how many highest/lowest results to view
    //const queryNumber = req.body.userSelection;
    const queryNumber = parseInt(req.query.number);
    var currentTime = new Date();
    var currentUtcTime = currentTime.toUTCString();

    //Return articles and its first revision data/creation date, in decending order
    const queryByHistory = [
        {
            $group: {
                _id: "$title",
                firstRev: { $min: "$timestamp" }
            }
        },
        { $sort: { firstRev: -1 } }
    ];



    Revinfo.aggregate(queryByHistory)
    .then(result => {
        res.status(200).json({
            confirmation: 'success',
            number_queried: queryNumber,
            shortest: resultConsolidationShort(result,queryNumber),
            longest: resultConsolidationLong(result,queryNumber),
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });

    function calculateAge(date1,date2) {
        var now = Date.parse(date2);
        var start = Date.parse(date1);
        var diff = Math.abs(now - start);
        var ageInDays = diff/60/60/24/1000;
        return ageInDays.toFixed(1);
    }

    function resultConsolidationShort(data,queryNumber) {
        var result = [];
        for (i=0;i<queryNumber;i++){
            result.push({title: data[i]._id, age_in_days: Number(calculateAge(data[i].firstRev, currentUtcTime))})
        }
        return result;
    }

    function resultConsolidationLong(data,queryNumber) {
        var result = [];
        for (i=data.length-1;i>data.length-queryNumber-1;i--){
            result.push({title: data[i]._id, age_in_days: Number(calculateAge(data[i].firstRev, currentUtcTime))})
        }
        return result;
    }
}


    //Return sorted count of groups of registered users (non bots) for each article.
    //BOT NOT FILTERED YET!!!!
    const aggCountOps2 = [
        {
            $group : {
                _id :  {
                    title: "$title",
                    user: "$user"
                }
            }
        },
        {
            $group : {
                _id : "$_id.title",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]





module.exports.sendBarChartData = function (req, res) {
    res.status(200).json({
        message: 'success',
        data:'This is the Bar Chart data endpoint!'
    })
}

module.exports.sendPieChartData = function (req, res) {
    res.status(200).json({
        message: 'success',
        data:'This is the Pie Chart data endpoint!'
    })
}
