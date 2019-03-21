import * as mongoose from 'mongoose';
import {UserSchema} from '../model/userModel';
import {Request, Response} from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController{
    public addNewUser (req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }

    public getAllUsers (req: Request, res: Response) {
        User.find({}, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.json(data)
        });
    }

    public getUser(req: Request, res: Response) {
        User.findById(req.params.userID, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    }

    public updateUser(req: Request, res: Response) {
        User.findByIdAndUpdate({ userID: req.params.userID}, req.body, {new: true}, (err, data) => {
            if(err) {
                res.send(err);
            }
            res.json(data);
        })
    }

    public deleteUser(req: Request, res:Response) {
        User.remove({userID: req.params.userID}, (err) => {
            if(err) {
                res.send(err); 
            }
            res.json({message: 'delete user successful'})
        })
    }
}
