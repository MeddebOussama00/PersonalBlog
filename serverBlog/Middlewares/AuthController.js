const jwt=require('jsonwebtoken');
const{errorhundler}=require('./error');
const { errorHandler } = require('./error');

const Auth = (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) {
        return next(new Error("Access Denied", 401));
    }
    try {
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return next(new Error("Access Denied", 401));
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return next(new Error("Access Denied", 401));
    }
};

module.exports = Auth;