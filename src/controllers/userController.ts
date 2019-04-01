import * as mongoose from "mongoose";
import { User } from "./../models/user";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const user = mongoose.model("User", User);

export class UserController {
    public login(req: Request, resp: Response) {
        user.findOne({ "username": req.body.username, "password": req.body.password }, (err, result) => {
            if (err) {
                console.log(err);
                resp.status(500).end();
            }
            if (!result) {
                resp.status(401).json({
                    errors: [{
                        "msg": "User does not exist!"
                    }]
                });
            }
            resp.json(
                {
                    token: jwt.sign(
                        { username: result.username, _id: result._id },
                        "secret",
                        {
                            expiresIn: 86400 // expires in 24 hours
                        }
                    )
                }
            );
        });
    }
}
