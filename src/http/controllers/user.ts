import usersModel from '@models/user';
import { Request, Response } from 'express';
import * as promise from 'bluebird';
import * as jwt from 'jsonwebtoken';

class Users {
    private model: any;

    constructor() {
        this.model = promise.promisifyAll(usersModel);
    }

    public index = async (req: Request, res: Response) => {
        try {
            var count = await this.model.collection.countDocuments();
            var user = await this.model.find();
            res.render('users/index', {
                title: 'List Users',
                data: user,
                total: count,
            });
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public show = async (req: Request, res: Response) => {
        try {
            var user = await this.model.findOne({ _id: req.params.id });
            res.render('users/user', {
                title: 'User',
                data: user
            });
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public add = (req: Request, res: Response) => {
        res.render('users/add', {
            title: 'Add user'
        });
    };

    public store = async (req: Request, res: Response) => {
        try {
            var user = new usersModel(req.body);
            // user.password = bcrypt.hashSync(req.body.password, 10);
            await user.save();
            res.redirect('/users');
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public edit = async (req: Request, res: Response) => {
        try {
            var user = await this.model.findOne({ _id: req.params.id });
            res.render('users/edit', {
                title: 'Edit Users',
                data: user
            });
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public update = async (req: Request, res: Response) => {
        var user = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            await this.model.findOneAndUpdate({ _id: req.params.id }, user);
            res.redirect(`/users`);
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            var user = await this.model.findOne({ _id: req.params.id });
            user.remove();
            res.redirect(`/users`);
        } catch (error) {
            res.render('error', { error: error, title: 'Error', status: 400 });
        }
    };

    public getLogin = (req: Request, res: Response) => {
        res.render('login', {
            title: 'Login'
        })
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
            res.send({
                token: jwt.sign({
                    email: user.email,
                    id: user.user_id
                }, 'RESTFULAPIs')
            })
        } catch (err) {
            res.render('error', { error: err, title: 'Error', status: 400 });
        }
    }
};

export default Users;
