import config from '../../config/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { ErrorHandler } from '../utils/errorHandler';
import { UserSchema } from '../models/userModel';
const User = mongoose.model('User', UserSchema);

export class AuthController {

    static login = async (req: Request, res: Response) => {
        const errorHandler: ErrorHandler = new ErrorHandler();
        // Check if username and password are set
        const { username, password } = req.body;
        if (!(username && password)) {
            return errorHandler.BadRequestResponse(res);
        }
        // Get user from database
        let user = await User.findOne({ 'username': username }, (err) => {
            if (err) {
                return errorHandler.UnauthorizedResponse(res);
            }
        });
        const token = jwt.sign(
            { userId: user.id },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        res.send({ token: token });
    };
}
