
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    var errorHandler: ErrorHandler = new ErrorHandler();
    var auth = req.headers.authorization;
    if (auth == undefined) {
        return errorHandler.UnauthorizedResponse(res);
    }
    var tmp = auth.split(' ')
    if(tmp.length <= 1) {
        return errorHandler.UnauthorizedResponse(res);
    }
    var token = tmp[1];
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, "secret");
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return errorHandler.UnauthorizedResponse(res);
    }
    next();
};
