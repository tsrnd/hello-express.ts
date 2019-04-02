import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { CheckJWT } from '../middlewares/CheckJWT';
import * as path from 'path';

export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.sendFile(path.resolve(__dirname + '/../views/index.html'));
            });
        app.route('/users')
            .get([CheckJWT], this.userController.getAllUser)
            .post(this.userController.addNewUser);
        app.route('/login')
            .post(AuthController.login);
    }
}
