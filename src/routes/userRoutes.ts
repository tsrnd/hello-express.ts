import { Request, Response } from "express";
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { checkJWT } from '../middlewares/checkJWT';

export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Get successfully'
                })
            });

        app.route('/users')
            .get([checkJWT], this.userController.getAllUsers)
            .post(this.userController.addNewUser);

        app.route('/user/:userID')
            .get(this.userController.getUser)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);

        app.route('/login')
            .post(AuthController.login);
    }
}