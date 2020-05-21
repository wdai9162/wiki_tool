const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
    const token = req.headers.authorization
    jwt.verify(token, "thisisgroup6wikiprojectforcomp5347webapplicationusyd"); 
    next();
    } catch (err) {
        res.status(401).json({
            confirmation: "failed",
            message: err,
        })
    }
}
