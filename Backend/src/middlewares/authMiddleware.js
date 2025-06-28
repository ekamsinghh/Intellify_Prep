const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { JWT_SECRET } = require('../config/index');
const protect = async (req, res, next) => {
    try{
        let token = req.headers['authorization'];
        if(token && token.startsWith('Bearer')){
            token = token.split(' ')[1];// extracting token
            var payload = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(payload.id).select("-password");// this excludes the password for security reasons
            next();
        }
        else{
            res.status(401).json({
                message: "Token Failed",
                data: {},
                success: false,
            });
        }
    }
    catch(err){
        console.log("Error in auth middleware");
        res.status(500).json({
            message: "Token authorization failed",
            data: {},
            success: false,
            error: err
        });
    }
}

module.exports = {
    protect
};