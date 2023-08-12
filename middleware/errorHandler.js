const { constant } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constant.VALIDATON_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case constant.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case constant.FORBIDDEN:
            res.json({ title: "forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constant.UNATHORIZED:
            res.json({ title: "Unathorized", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("No error found, All good!")
            break;
    }

}
module.exports = errorHandler