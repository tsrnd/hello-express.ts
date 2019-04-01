import * as mongoose from "mongoose";
import { User } from "./../models/user";
import { Request, Response } from "express";

const user = mongoose.model("User", User);

export class UserController {
    public get(req: Request, resp: Response) {
        user.find({}, (err, result) => {
            if (err) {
                console.log(err);
                resp.status(500).end();
            }
            resp.render("index", {
                users: result
            });
        });
    }
}
