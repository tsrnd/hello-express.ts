import usersModel from '@models/user';
import { Request, Response } from 'passport';
import * as promise from 'bluebird';

class Users {
    private model: any;

    constructor() {
        this.model = promise.promisifyAll(usersModel);
    }

    public index = async (req: Request, res: Response) => {
        try {
            var count = await this.model.collection.countDocuments();
            var user = await this.model.find({ _id: { $ne: req.user._id } });
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
        if (req.isAuthenticated()) {
            res.redirect('/users');
        }
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
};

export default Users;
