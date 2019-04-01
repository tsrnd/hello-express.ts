import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { ChatController } from "../controllers/chatController";
import { Auth } from "../middleware/auth";


export class Routes {
    public userController: UserController = new UserController();
    public chatController: ChatController = new ChatController();
    public auth: Auth = new Auth();
    public routes(app): void {
        app.get("/", (req: Request, resp: Response) => {
            resp.render("index");
        });
        app.post("/login", this.userController.login);
    }
}
