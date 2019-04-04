import usersModel from '@models/user';
import { Request, Response } from 'passport';
import * as promise from 'bluebird';

class Users {
    private model: any;

    constructor() {
        this.model = promise.promisifyAll(usersModel);
    }

    public getLogin = (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.redirect('/users');
        }
        res.render('login', { title: 'Login' })
    }

    public login = async (req: Request, res: Response) => {
        try {
            var user = await this.model.findOne({
                email: req.body.email,
                password: req.body.password
            });
            if (!user) {
                res.render('error', { error: new Error('user not exists'), title: 'Error', status: 400 });
            }
            // if (user.comparePassword(req.body.password)) {
            console.log(user);
        } catch (err) {
            res.render('error', { error: err, title: 'Error', status: 400 });
        }
    }

    public logout = async (req: Request, res: Response) => {
        try {
            req.logout();
            res.redirect('/login');
        } catch (err) {
            res.render('error', { error: err, title: 'Error', status: 400 });
        }
    }
};

export default Users;
