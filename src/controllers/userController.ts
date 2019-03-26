import * as mongoose from "mongoose";
import { User } from "./../models/user";
import { Request, Response, response } from "express";

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
    public addUser(req: Request, resp:Response){
        let newUser = new user(req.body);
        newUser.save((err, user)=>{
            if(err){
                resp.status(500).send(err);
            }    
            resp.json(user);
        })

    }
    public detail(req: Request, resp: Response){
        user.findById(req.params.id, (err, user)=>{
            if(err) { 
                resp.send(err);
            }
            resp.json(user);
        })
    }
    public edit(req: Request, resp: Response){
        user.findOneAndUpdate({_id:req.params.id}, req.body, (err,user)=>{
            if(err){
                resp.send(err);
            }
            resp.json(user);
        })
    }
    public delete(req: Request, resp: Response) {
        user.remove({_id:req.params.id}, (err, user) => {
            if(err){
                resp.send(err);
            }
            resp.json({
                message:"Deleted Successfully"
            })
        })
    }

}
