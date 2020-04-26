const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    console.log(req.headers.authorization)
    const token = req.headers.authorization
    console.log(token)
    decoded=jwt.verify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd",function(err, decoded) {
        if(err)
        {
                res.status(401).json({
                    // confirmation: "failed",
                    // message: "Invalid token!"
                    err: err
                })


        }
        else{
            next()
        }// bar
    })
    // console.log(decoded);
    // if (decoded===true) {
    //     next();
    // }
    // else {
    //     console.log("test")
    //     res.status(401).json({
    //         // confirmation: "failed",
    //         // message: "Invalid token!"
    //         decode:decoded
    //     })
    //
    //
    // }
    //console.log(decoded.foo)
}
