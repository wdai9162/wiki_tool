/**
 * individual.controller.js
 *
 */

 
const Revinfo = require ('../model/revinfo');  //all articles
const fetch = require("node-fetch");

module.exports.checkUptoDate = function (req, res) {

    //*****BUG when the latest revision is more than 24hours, still shows expire and needs to be handled */

    var article = req.query.title || "India";
    var currentTime = new Date();
    
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
        //console.log(result);
        timeElap=calculateTime(currentTime, result[0].lastRev);
        if(timeElap>=60*60*24){
            res.status(200).json({
                confirmation: 'expired',
                date: result
            })
        }
        else {
            res.status(200).json({
                confirmation: 'Up to date',
                date: result
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
}

module.exports.getArticleUpdate = function (req, res) {

    var articleTitle = req.query.title || "India"

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
        action: "query",
        prop: "revisions",
        titles: articleTitle,
        rvprop: "ids|flags|user|userid|timestamp|size|sha1|parsedcomment", 
        rvslots: "main",
        formatversion: "2",
        format: "json",
        rvend: '2020-03-20T02:55:44Z',
        rvlimit: 'max'
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        console.log(response.query.pages[0].revisions);
        Revinfo.insertMany(response.query.pages[0].revisions).then(result => {
            console.log(result)
            res.json({
                confirmation:'Successfully downloaded latest data for Article:' + articleTitle,
                newRevDownloaded: response.query.pages[0].revisions.length,
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
    .catch(function(error){console.log(error);});
   
}

