 module.exports = (dbcollection) => {

    dbcollection.find({timestamp: {$not: {$type: 9}}})
        .then(docs=>{
            console.log(docs)
            docs.forEach(doc => {
            doc.timestamp = new ISODate(doc.timestamp);
            dbcollection.save(doc)
        })
    })
    .catch(err => {
        res.json({
            confirmation:'failed',
            message: err
        })
    })
}
