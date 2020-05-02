/**
 * overall.controller.js
 *
 * This controller module exposes three methods:
 *  - sendOverallStats is used for sending the overall statistic data
 *  - sendBarChartData is used for sending the data to graph a bar chart, describing revision number distribution by year and by user
 *  - sendPieChartData is used for sending the data to graph a pie chart, describing revision number distribution by user type ('Administrator', 'Anonymous', 'Bot' and 'Regular user')
 *
 */


const Revinfo = require ('../model/revinfo');  //all articles
const fs = require ('fs');
const path = require('path');

const os = require('os');
console.log(os.type().toString());
//import bot user filter file
var botUser;
var adminUser;
var userAdminBot
if(os.type().toString().toUpperCase().indexOf("windows")!=-1) {
    botUser = fs.readFileSync(path.join(__dirname, '/../user_filter/bots.txt')).toString().split("\r\n");   // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query

//import admin user filter file
    adminUser = fs.readFileSync(path.join(__dirname, '/../user_filter/administrators.txt')).toString().split("\r\n");   // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query

//join both admin and bot lists
    userAdminBot = botUser.concat(adminUser).sort();
}
else
{
    botUser = fs.readFileSync(path.join(__dirname, '/../user_filter/bots.txt')).toString().split("\n");   // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query

//import admin user filter file
    adminUser = fs.readFileSync(path.join(__dirname, '/../user_filter/administrators.txt')).toString().split("\n");   // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query

//join both admin and bot lists
    userAdminBot = botUser.concat(adminUser).sort();

}


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
    const queryNumber =parseInt(req.query.number);

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

module.exports.anonUserByYear = function (req, res) {

    //query for total count of revisions by anonymous users in each year
    const queryAnonUser = [
        {
            "$match" : {
                "anon" : true
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "anonCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    Revinfo.aggregate(queryAnonUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].anonCount;
        }
        res.status(200).json({
            confirmation: 'success',
            total: sum,
            result: result,
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}

module.exports.botUserByYear = function (req, res) {

    //query for total count of revisions by bot users in each year
    const queryBotUser =      [
        {
            "$match" : {
                "user" : {
                    "$in" : botUser
                }
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "botCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    Revinfo.aggregate(queryBotUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].botCount;
        }
        res.status(200).json({
            confirmation: 'success',
            total: sum,
            result: result
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}

module.exports.adminUserByYear = function (req, res) {

    //query for total count of revisions by admin users in each year
    const queryAdminUser =      [
        {
            "$match" : {
                "user" : {
                    "$in" : adminUser
                }
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "adminCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    Revinfo.aggregate(queryAdminUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].adminCount;
        }
        res.status(200).json({
            confirmation: 'success',
            total: sum,
            result: result
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}

module.exports.regUserByYear = function (req, res) {

    //query for total count of revisions by regular users in each year
    const queryRegUser =      [
        {
            "$match" : {
                "$and" : [
                    {
                        "user" : {
                            "$nin" : userAdminBot
                        }
                    },
                    {
                        "anon" : {
                            "$exists" : false
                        }
                    }
                ]
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "regCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    Revinfo.aggregate(queryRegUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].regCount;
        }
        res.status(200).json({
            confirmation: 'success',
            total: sum,
            result: result
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });
}



module.exports.graphData = function (req, res) {

    var graphData = {};
    //query for total count of revisions by anonymous users in each year
    const queryAnonUser = [
        {
            "$match" : {
                "anon" : true
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "anonCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    //query for total count of revisions by bot users in each year
    const queryBotUser =      [
        {
            "$match" : {
                "user" : {
                    "$in" : botUser
                }
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "botCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    //query for total count of revisions by admin users in each year
    const queryAdminUser =      [
        {
            "$match" : {
                "user" : {
                    "$in" : adminUser
                }
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "adminCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];

    //query for total count of revisions by regular users in each year
    const queryRegUser =      [
        {
            "$match" : {
                "$and" : [
                    {
                        "user" : {
                            "$nin" : userAdminBot
                        }
                    },
                    {
                        "anon" : {
                            "$exists" : false
                        }
                    }
                ]
            }
        },
        {
            "$addFields" : {
                "timestamp" : {
                    "$toDate" : "$timestamp"
                }
            }
        },
        {
            "$group" : {
                "_id" : {
                    "$year" : "$timestamp"
                },
                "regCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : -1.0
            }
        }
    ];


    anonQuery = Revinfo.aggregate(queryAnonUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].anonCount;
        }
        graphData.anonUser = {total: sum, result};
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });

    botQuery = Revinfo.aggregate(queryBotUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].botCount;
        }
        graphData.botUser = {total: sum, result};
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });

    adminQuery = Revinfo.aggregate(queryAdminUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].adminCount;
        }
        graphData.adminUser = {total: sum, result};
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: er
        })
    });

    regQuery = Revinfo.aggregate(queryRegUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].regCount;
        }
        graphData.regUser = {total: sum, result};
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    });

    Promise.all([anonQuery, botQuery, adminQuery, regQuery]).then(() => {
        console.log(graphData);
        res.status(200).json(graphData);
      })





    }
