import { Request, Response, Router } from 'express';
import Users from '@controllers/user';
import Chats from '@controllers/chat';
import exampleController from '@controllers/example';

class Routes {
    public router: Router;
    private usersController: Users;
    private chatsController: Chats;

    constructor() {
        this.router = Router();
        this.usersController = new Users();
        this.chatsController = new Chats();
        this.routes();
    }

    private routes(): void {
        this.router.route('/example').get(exampleController.index);

        this.router.get('/login', this.usersController.getLogin);
        this.router.post('/login', this.usersController.login);
        // Users
        this.router.get('/users/add', this.usersController.add);
        this.router.get('/users/:id/edit', this.usersController.edit)
        this.router.get('/users', this.usersController.index)
        this.router.post('/users', this.usersController.store);
        this.router.get('/users/:id', this.usersController.show)
        this.router.put('/users/:id', this.usersController.update)
        this.router.delete('/users/:id', this.usersController.delete);

        // Chats
        this.router.get('/chats', this.chatsController.index);
        this.router.get('/chats/room', this.chatsController.room);
        this.router.get('/chatsWith', this.chatsController.chat);
    };

    public getRouter(): Router {
        return this.router
    }
};

export default new Routes();

