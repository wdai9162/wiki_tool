//This is a module to check Timestamp field in the database to ensure it's not a string type, avoiding bugs
 module.exports = (dbcollection) => {

    try {
        dbcollection.updateMany( 
            { timestamp: { $type: 2 } }, 
            [{ 
                $addFields: { 
                    timestamp: { 
                        $toDate: "$timestamp" 
                    }
                }
            }]).then(result => {console.log(result); console.log("All timestamp checked and changed to Date object")}); 
    } catch(error) {
        console.error(error);
    }
 }
