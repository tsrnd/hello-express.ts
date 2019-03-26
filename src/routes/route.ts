import { Request, Response } from "express";
import { UserController } from "./../controllers/userController";


export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.get("/users", this.userController.get);
        app.post("/users", this.userController.addUser);
        app.get("/user/:id", this.userController.detail);
        app.put("/user/:id", this.userController.edit);
        app.delete("/user/:id", this.userController.delete);
    }
}
