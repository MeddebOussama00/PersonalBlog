const notfound = (req, res, next) => {
    const error = new Error(`Error 404! - Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorhundler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });

};

module.exports = { notfound, errorhundler };
