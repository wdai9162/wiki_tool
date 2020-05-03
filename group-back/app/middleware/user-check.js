const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers.authorization
    decoded=jwt.verify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd",function(err, decoded) {
        if(err)
        {
            res.status(401).json({
                confirmation: "failed",
                message: err,
            })
        }
        next();
    })
}
