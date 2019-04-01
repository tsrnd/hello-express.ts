import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/errorHandler';
import config from '../../config/config';

export const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
    let errorHandler: ErrorHandler = new ErrorHandler();
    // const token = <string>req.headers['authorization'];
    const token = req.headers.authorization;
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return errorHandler.UnauthorizedResponse(res);
    }

    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
        expiresIn: '1h'
    });
    res.setHeader('token', newToken);

    // Call the next middleware or controller
    next();
};