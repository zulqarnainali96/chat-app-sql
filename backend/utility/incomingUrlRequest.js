const inComingUrlRequest = (req, res, next) => {
    // console.log(req.method + ' ' + req.url);
    next();
}

export { inComingUrlRequest };