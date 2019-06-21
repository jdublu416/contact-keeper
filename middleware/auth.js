const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next){
    //get token from header
    const token = req.header('x-auth-token');//middleware function that takes the x-auth-token value from the header

    //check if not token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; //if there is a token we verify it, pull out the payload and set the user 
        //in that payload to req.user so we access to this inside the route
        next(); 
    } catch (err) {
       res.status(401).json({ msg: 'Token not valid' }); 
    }
}