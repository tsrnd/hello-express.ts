import {Request, Response}  from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import {UserSchema} from '../model/userModel';
const User  = mongoose.model('User', UserSchema);

export class AuthController {
    static login = async (req: Request, res: Response) => {
        let {username, password} = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        var user =  await User.findOne({'username': username}, (err) => {
            if (err) {
                res.status(401).send({message: "fail 401"})
            }
        });
        const token = jwt.sign(
            { userId: user.id },
            "secret",
            { expiresIn: "1h" }
        );
        res.send({token: token})
    }
}