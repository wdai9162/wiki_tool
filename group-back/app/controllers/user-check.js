const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization
    decoded=jwt.varify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd")
    if (decoded===true) {
        next(); 
    }
    else {
        res.status(401).json({
            confirmation: "failed",
            message: "Invalid token!"
        })
    }
    //console.log(decoded.foo)
}