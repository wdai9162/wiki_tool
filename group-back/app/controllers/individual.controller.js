/**
 * individual.controller.js
 *
 */

const Revinfo = require ('../model/revinfo');  //all articles
const fetch = require("node-fetch");
const fs = require ('fs');
const os = require('os');
const path = require('path');

//import bot user filter file
var botUser;
var adminUser;
var userAdminBot
if(os.type().toString().toUpperCase().indexOf("WINDOWS")!=-1) {
    botUser = fs.readFileSync(path.join(__dirname, '/../user_filter/bots.txt')).toString().split("\r\n");
    //the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query
    //import admin user filter file
    adminUser = fs.readFileSync(path.join(__dirname, '/../user_filter/administrators.txt')).toString().split("\r\n");
    // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query
    //join both admin and bot lists
    userAdminBot = botUser.concat(adminUser).sort();
}
else
{
    botUser = fs.readFileSync(path.join(__dirname, '/../user_filter/bots.txt')).toString().split("\n");
    // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query
    //import admin user filter file
    adminUser = fs.readFileSync(path.join(__dirname, '/../user_filter/administrators.txt')).toString().split("\n");
    // the difference of return "/n" in MAC and "/r/n" cause a bug here, resulting in data error during query
    //join both admin and bot lists
    userAdminBot = botUser.concat(adminUser).sort();
}

module.exports.articleList = function (req, res) {
    const getListandCount = [
        {
            "$group" : {
                "_id" : "$title",
                "revCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "_id" : 1.0
            }
        }
    ];

    Revinfo.aggregate(getListandCount)
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
}

module.exports.checkDateAndUpdate = function (req, res) {

    var article = req.query.title; 
    var currentTime = new Date(); 
    var lastRevDate;

    const maxDateAndCountQuery = [
        {
            "$group" : {
                "_id" : "$title",
                "lastRev" : {
                    "$max" : "$timestamp"
                },
                "count" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$match" : {
                "_id" : article
            }
        }
    ]
    Revinfo.aggregate(maxDateAndCountQuery)
    .then(result=>{
 
        timeElap=calculateTime(currentTime, result[0].lastRev);    //calculate how long it has been since the latest revision record
        lastRevDate=result[0].lastRev;         //record for new Wiki API request to determine up to which date to download
        
        //check if the records are considered as expired, >24hrs
        if(timeElap>=60*60*24){

            console.log("Expired, last recorded Revision Date: \n" + lastRevDate)
            fetchandUpdate(article,lastRevDate);

        }
        else {
            res.status(200).json({
                confirmation: 'Up to date, last recorded Revision Date: \n' + lastRevDate +"\nNo pulling request made.",
                data: result
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            confirmation:'failed to determine if article is expired',
            message: err
        })
    })

    function calculateTime(lastRevTimestamp,current) {
        var now = Date.parse(current);
        var lastRev = Date.parse(lastRevTimestamp);
        var diff = Math.abs(now - lastRev);
        var ageInSec = diff/1000;
        return ageInSec.toFixed(1);
    }

    function fetchandUpdate(articleName, articleLastRevDate) {

        //Due to inconsistent type of timestamp stored in DB, string from original and date from new download,
        //there will be a bug here to operate with expected Date object. ************
        try {
                lstRevDateInUTC = articleLastRevDate.toUTCString();  
        } catch(error) {
            console.error(error);
        }

        var url = "https://en.wikipedia.org/w/api.php";
        var params = {
        action: "query",
        prop: "revisions",
        titles: articleName,
        rvprop: "ids|flags|user|userid|timestamp|size|sha1|parsedcomment",
        rvslots: "main",
        formatversion: "2",
        format: "json",
        rvdir: "newer",
        rvstart: lstRevDateInUTC,
        rvlimit: 'max'
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        fetch(url)
        .then( response => { return response.json() })
        .then( response => { 
            response.query.pages[0].revisions.forEach(rev => {     //insert article title for each revision record
                rev.title = articleName;
            })
            
            response.query.pages[0].revisions.shift()              //remove first revision which is duplicated with the last exisitng revision

            var newCount = response.query.pages[0].revisions.length; 

            if (response.query.pages[0].revisions.length === 0) { 
                res.status(200).json({
                    confirmation:'Expired, last recorded Revision Date: \n'+lastRevDate + '\nAttempted to pull new data for Article: \n"' + articleName + '"\nBut there is no newer data than the recorded last revesion.',
                    newDownload: 0,
                    message: response.query.pages[0].revisions
                })
            }

            else {
                Revinfo.insertMany(response.query.pages[0].revisions)
                .then(response => {
                    console.log("Successfully saved " + newCount + " new revisions")
                    res.status(200).json({
                        confirmation:'Expired, last recorded Revision Date: \n'+lastRevDate + '\nSuccessfully downloaded latest data for Article: \n"' + articleName + '"\nNumber of new revisions saved database is: \n' + newCount,
                        newRevSavedToDB: newCount,
                        message: response
                    })
                })
                .catch(err => {
                    res.json({
                        confirmation:'Failed to save new data to database' + '\nerr:' + err,
                        message: err
                    })
                })
            }
        })
    }
}

module.exports.regUserByRevNumber = function (req, res) {

    var title = req.query.title;
    var startYear = req.query.stryr + "-01-01T00:00:00Z"
    var endYear = (Number(req.query.endyr)+1).toString()+"-01-01T00:00:00Z";
    
    console.log(title+" "+startYear+" "+endYear)

    const regUserByRevNumber = [
        {
            "$match" : {
                "$and" : [
                    {
                        "title" : title
                    },
                    {
                        "user" : {
                            "$nin" : userAdminBot
                        }
                    },
                    {
                        "anon" : {
                            "$exists" : false
                        }
                    },
                    { 
                        "timestamp" : { 
                            "$gte" : new Date(startYear)
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$lt" : new Date(endYear)
                        }
                    }
                ]
            }
        },
        {
            "$group" : {
                "_id" : "$user",
                "revCount" : {
                    "$sum" : 1.0
                }
            }
        },
        {
            "$sort" : {
                "revCount" : -1.0
            }
        }
    ];

    Revinfo.aggregate(regUserByRevNumber).limit(5)
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
}

module.exports.getNewsReddit = function (req, res) {

    title = req.query.title;

    var url = "https://www.reddit.com/r/news/search.json" //"https://en.wikipedia.org/w/api.php";
    var params = {
    q: title,
    sort: "top",
    limit: 3,
    restrict_sr: 1    //restrict our search to the current subreddit.
    };

    var url1 = url + "?";
    Object.keys(params).forEach(function(key){url1 += "&" + key + "=" + params[key];});

    fetch(url)
    .then(response => {return response.json();})
    .then(response => {
        
        //attemp for a second try if previou serach does not return any result, this time disable restrict search mode  
        if (response.data.children.length === 0){
            var url2 = url + "?"; 
            delete params.restrict_sr;
            Object.keys(params).forEach(function(key){url2 += "&" + key + "=" + params[key];});
            fetch(url2)
            .then(response => {return response.json();})
            .then(response => { 
                var newsTitleUrl = response.data.children.map(extractTitleandURL)
                res.json({
                    confirmation: "success",
                    data: newsTitleUrl
                })
            })
        }

        else {
            var newsTitleUrl = response.data.children.map(extractTitleandURL)
            res.json({
                confirmation: "success",
                data: newsTitleUrl
            })
        }
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message:  err
        })
    })

    function extractTitleandURL(news) {
        return {
            title: news.data.title,
            URL: news.data.url
        }
    }
}

module.exports.graphData = function (req, res) {
    
    var graphData = {};
    var article = req.query.title;
    var startYear = req.query.stryr + "-01-01T00:00:00Z"
    var endYear = (Number(req.query.endyr)+1).toString()+"-01-01T00:00:00Z";

    //query for total count of revisions by anonymous users in each year
    const queryAnonUser = [ 
        { 
            "$match" : { 
                "$and" : [
                    { 
                        "title" : article
                    }, 
                    { 
                        "anon" : true
                    }, 
                    { 
                        "timestamp" : { 
                            "$gte" : new Date(startYear)
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$lt" : new Date(endYear)
                        }
                    }
                ]
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
                "_id" : 1.0
            }
        }
    ];

    //query for total count of revisions by bot users in each year
    const queryBotUser =      [
        { 
            "$match" : { 
                "$and" : [
                    { 
                        "title" : article
                    }, 
                    { 
                        "user" : { 
                            "$in" : botUser
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$gte" : new Date(startYear)
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$lt" : new Date(endYear)
                        }
                    }
                ]
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
                "_id" : 1.0
            }
        }
    ];

    //query for total count of revisions by admin users in each year
    const queryAdminUser =      [
        { 
            "$match" : { 
                "$and" : [
                    { 
                        "title" : article
                    }, 
                    { 
                        "user" : { 
                            "$in" : adminUser
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$gte" : new Date(startYear)
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$lt" : new Date(endYear)
                        }
                    }
                ]
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
                "_id" : 1.0
            }
        }
    ];

   //query for total count of revisions by regular users in each year
   const queryRegUser =      [
    {
        "$match" : {
            "$and" : [
                { 
                    "title" : article
                }, 
                { 
                    "user" : { 
                        "$nin" : userAdminBot
                    }
                }, 
                { 
                    "timestamp" : { 
                        "$gte" : new Date(startYear)
                    }
                }, 
                { 
                    "timestamp" : { 
                        "$lt" : new Date(endYear)
                    }
                }
            ]
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
    });

    botQuery = Revinfo.aggregate(queryBotUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].botCount;
        }
        graphData.botUser = {total: sum, result};
    });

    adminQuery = Revinfo.aggregate(queryAdminUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].adminCount;
        }
        graphData.adminUser = {total: sum, result};
    });

    regQuery = Revinfo.aggregate(queryRegUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].regCount;
        }
        graphData.regUser = {total: sum, result};
    });

    Promise.all([anonQuery, botQuery, adminQuery, regQuery])
    .then(() => {
        res.status(200).json(graphData);
      })
    .catch((err) => {
        res.json({
            confirmation: "failed",
            err: err
        })
    })

}

module.exports.topUserGraph = function (req, res) {

    var article = req.query.title || "Australia";
    var startYear = req.query.stryr + "-01-01T00:00:00Z";
    var endYear = (Number(req.query.endyr)+1).toString()+"-01-01T00:00:00Z";
    var topUser = req.query.topuser || "PDH"; 
    
    //query for total count of revisions by anonymous users in each year
    const queryTopUser = [
        { 
            "$match" : { 
                "$and" : [
                    { 
                        "title" : article
                    }, 
                    { 
                        "user" : topUser
                    }, 
                    { 
                        "timestamp" : { 
                            "$gte" : new Date(startYear)
                        }
                    }, 
                    { 
                        "timestamp" : { 
                            "$lt" : new Date(endYear)
                        }
                    }
                ]
            }
        }, 
        { 
            "$group" : { 
                "_id" : { 
                    "$year" : "$timestamp"
                }, 
                "topUserCount" : { 
                    "$sum" : 1.0
                }
            }
        }, 
        { 
            "$sort" : { 
                "_id" : 1.0
            }
        }
    ];
    
    Revinfo.aggregate(queryTopUser)
    .then(result => {
        var sum=0;
        for(var i in result) {
            sum += result[i].topUserCount;
        }
        res.status(200).json({
            total: sum, 
            result
        })
    })
    .catch((err) => {
        res.json({
            confirmation: "failed",
            err: err
        })
    })
}
