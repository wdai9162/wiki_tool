/**
 * individual.controller.js
 *
 */

const Revinfo = require ('../model/revinfo');  //all articles
const fetch = require("node-fetch");

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

module.exports.checkUptoDate = function (req, res) {

    //*****BUG when the latest revision is more than 24hours, still shows expire and needs to be handled */

    var article = req.query.title || "Australia";
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
    lastRev = Revinfo.aggregate(maxDateAndCountQuery)
    .then(result=>{

        timeElap=calculateTime(currentTime, result[0].lastRev);    //calculate how long it has been since the latest revision record 
        lastRevDate=result[0].lastRev;         //record for new Wiki API request to determine up to which date to download 
        console.log(lastRevDate)
        //check if the records are considered as expired, >24hrs 
        if(timeElap>=60*60*24){

            fetchandUpdate(article,lastRevDate);

        }
        else {
            res.status(200).json({
                confirmation: 'Up to date',
                data: result
            })
        }
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
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
        rvstart: articleLastRevDate,
        //rvend: articleLastRevDate,
        rvlimit: 'max'
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            response.query.pages[0].revisions.forEach(rev => {     //insert article title for each revision record 
                rev.title = articleName; 
            })
            response.query.pages[0].revisions.shift()              //remove first revision which is duplicated with the last exisitng revision 

            if (response.query.pages[0].revisions.length === 0) {
                res.json({
                    confirmation:'Attempted to download new data for Article:' + articleName + ', but there is no newer data to download.',
                    newDownload: 0,
                    message: result
                })
            }
            
            Revinfo.insertMany(response.query.pages[0].revisions)
            .then(result => {
                res.json({
                    confirmation:'Successfully downloaded latest data for Article:' + articleName,
                    newRevSavedToDB: response.query.pages[0].revisions.length,
                    message: result
                })
            })
            .catch(err => {
                res.json({
                    confirmation:'failed',
                    message: err
                })
            })
        })
    }
}