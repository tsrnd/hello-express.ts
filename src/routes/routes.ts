import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { CheckJWT } from '../middlewares/CheckJWT';

export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Hello nodejs team1'
                });
            });
        app.route('/users')
            .get([CheckJWT], this.userController.getAllUser)
            .post(this.userController.addNewUser);
        app.route('/login')
            .post(AuthController.login);
    }
}
