const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
        // req.user = decoded;
        console.log(decodedPayload);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = auth;

