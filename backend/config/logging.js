const logging = (req, res, next) => {
    console.log(`${new Date()} - Body: ${JSON.stringify(req.body)} - Url: ${req.originalUrl}`);
    next();
}

module.exports = logging;