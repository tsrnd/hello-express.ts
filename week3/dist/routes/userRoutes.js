"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const checkJWT_1 = require("../middlewares/checkJWT");
class Routes {
    constructor() {
        this.userController = new userController_1.UserController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Get successfully'
            });
        });
        app.route('/users')
            .get([checkJWT_1.checkJWT], this.userController.getAllUsers)
            .post(this.userController.addNewUser);
        app.route('/user/:userID')
            .get(this.userController.getUser)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
        app.route('/login')
            .post(authController_1.AuthController.login);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=userRoutes.js.map