import usersModel from '@models/user';
import { Request, Response } from 'express';

class Users {
    public index = function (req: Request, res: Response) {
        usersModel.collection.countDocuments(function (err: any, count: number) {
            if (err) {
                res.render('error', { error: err, title: 'Error', status: 400 });
            }
            usersModel.find(function (err: any, data: any) {
                if (err) {
                    res.render('error', { error: err, title: 'Error', status: 400 });
                }
                res.render('users/index', {
                    title: 'List Users',
                    data: data,
                    total: count,
                });
            });
        })
    };

    public show = function (req: Request, res: Response) {
        console.log("=".repeat(20), req.url);

        usersModel.findOne({
            _id: req.params.id
        }, function (err: any, data: any) {
            if (err) {
                // res.render('error', { error: err, title: 'Error', status: 400 });
            }
            console.log("=".repeat(20), data);
            res.render('users/user', {
                title: 'User',
                data: data
            });
        })
    };

    public add = function (req: Request, res: Response) {
        res.render('users/add', {
            title: 'Add user'
        })
    };

    public store = function (req: Request, res: Response) {
        var user = new usersModel(req.body);
        // user.password = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err: any, data: any) {
            if (err) {
                res.render('error', { error: err, title: 'Error', status: 400 });
            }
            res.redirect('/users');
        });
    };

    public edit = function (req: Request, res: Response) {
        usersModel.findOne({
            _id: req.params.id
        }, function (err: any, data: any) {
            if (err) {
                res.render('error', { error: err, title: 'Error', status: 400 });
            }
            res.render('users/edit', {
                title: 'Edit Users',
                data: data
            });
        })
    };

    public update = function (req: Request, res: Response) {
        var data = {
            email: req.body.email,
            password: req.body.password,
        };
        usersModel.findOneAndUpdate({
            _id: req.params.id
        }, data, { new: true }, function (err: any, result: any) {
            console.log(result);
            if (err) {
                res.render('error', { error: err, title: 'Error', status: 400 });
            }
            res.redirect(`/users`);
        });
    };

    public delete = function (req: Request, res: Response) {
        usersModel.findOne({ _id: req.params.id }, function (err: any, data: any) {
            if (err) {
                res.render('error', { error: err, title: 'Error', status: 400 });
            }
            data.remove(function (err: any) {
                if (err) {
                    res.render('error', { error: err, title: 'Error', status: 400 });
                }
                res.redirect(`/users`);
            });
        });
    };

    public getLogin = function (req: Request, res: Response) {
        res.render('login', {
            title: 'Login'
        })
    }

    // public login = async function (req: Request, res: Response) {
    //     try {
    //         var user = await model.Func.FindOne(model.Users, {
    //             username: req.body.username
    //         });
    //         if (!user) {
    //             // throw new ErrorEvent("user not exist")
    //         }
    //         if (user.comparePassword(req.body.password)) {
    //             res.send({
    //                 token: jwt.sign({
    //                     username: user.username,
    //                     id: user.user_id
    //                 }, 'RESTFULAPIs')
    //             })
    //         }
    //         res.send({
    //             message: "error"
    //         })
    //     } catch (error) {
    //     }
    // }
};

export default Users;
