import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { userInfo } from 'os';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser(req: Request, res: Response) {
        const newUser = new User(req.body);

        newUser.save((err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }

    public getAllUser(req: Request, res: Response) {
        User.find({ 'username': 'tam' }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
}