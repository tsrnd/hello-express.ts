import { Request, Response } from "express";
import { UserController } from "./../controllers/userController";
import * as path from 'path';


export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.get('/', function(req, res) {
            res.sendfile(path.resolve(__dirname + '/../views/index.html'));
         });
         app.get( '/room', function( req, res ) {
            res.render('room');
          } );
        app.get("/users", this.userController.get);
        app.post("/users", this.userController.addUser);
        app.get("/user/:id", this.userController.detail);
        app.put("/user/:id", this.userController.edit);
        app.delete("/user/:id", this.userController.delete);
    }
}
