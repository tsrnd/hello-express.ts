import { Router } from 'express';
import Auth from '@controllers/auth';
import Users from '@controllers/user';
import Chats from '@controllers/chat';
import exampleController from '@controllers/example';
import Authenticated from '@http/middleware/auth';
import { Request, Response } from 'passport';

class Routes {
    private router: Router;
    private authController: Auth;
    private usersController: Users;
    private chatsController: Chats;
    private passport: any;

    constructor(passport: any) {
        this.router = Router();
        this.passport = passport;
        this.usersController = new Users();
        this.chatsController = new Chats();
        this.authController = new Auth();
        this.routes();
    }

    private routes(): void {
        this.router.all('*', Authenticated)
        this.router.route('/example').get(exampleController.index);
        this.router.route('/fb').get((req, res) => {
            res.render('chats/facebook');
        });

        // Auth
        this.router.get('/login', this.authController.getLogin);
        this.router.post('/login', this.passport.authenticate('login', {
            successRedirect: '/users',
            failureRedirect: '/login',
            failureFlash: true
        }));

        this.router.post('/logout', function (req: Request, res: Response) {
            res.locals.user = null;
            req.logout();
            res.redirect('/login');
        });

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
        this.router.get('/chats/room/:id', this.chatsController.room);
        this.router.get('/chats/:id', this.chatsController.chat);
    };

    public getRouter(): Router {
        return this.router
    }
};

export default Routes;

