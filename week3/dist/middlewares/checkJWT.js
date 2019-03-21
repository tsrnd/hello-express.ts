"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const errorHandler_1 = require("../utils/errorHandler");
exports.checkJWT = (req, res, next) => {
    var errorHandler = new errorHandler_1.ErrorHandler();
    var auth = req.headers.authorization;
    if (auth == undefined) {
        return errorHandler.UnauthorizedResponse(res);
    }
    var tmp = auth.split(' ');
    if (tmp.length <= 1) {
        return errorHandler.UnauthorizedResponse(res);
    }
    var token = tmp[1];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, "secret");
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        return errorHandler.UnauthorizedResponse(res);
    }
    next();
};
//# sourceMappingURL=checkJWT.js.map