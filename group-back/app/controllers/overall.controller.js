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

module.exports.sendOverallStats = function (req, res) {
    //extract user selection of the number of how many highest/lowest results to view
    //const queryNumber = req.body.userSelection;
    const queryNumber = 2;

    //Return sorted count of total revisions of each article, top 2 and bottom 2 are needed
    const aggCountOps1 = [
        {
            $group : {
                 _id : "$title",
                 count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } },
        {
          $limit: 2
        }
    ]

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

    //The top two articles edited by the largest group of registered users (non bots) and their group size. Each wiki article is edited by a number of users, some making multiple revisions. The number of unique users is a good indicator of an article’s popularity.
    const aggCountOps3 = [
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
/*
    var data = [123];

    Revinfo.aggregate(aggCountOps1, (err, result) => {
        if (err) {
            res.json({
                confirmation:'failed',
                message: err
            })
        };
        data.push(result[0,3]);
    })

    res.status(200).send(data);
*/


    Revinfo.aggregate(aggCountOps1)
    .then(revs => {
        res.status(200).json({
            message: 'success',
            data:revs
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });

}

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
