let errorHelpers = {
    logErrorsToConsole: function( err, req, res, next) {
        console.error("Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err);
    },
    clientErrorHandler: function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).json({
                "status": 500,
                "statusText": "Internal Server Error",
                "message": "XMLHttpRequest error",
                "error": {
                }
            });
        }
    }
};