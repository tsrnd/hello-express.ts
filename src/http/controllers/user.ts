import { Response, Request } from 'express';
import User from '../../models/user';
import * as Http from '../../util/http';
import * as jwt from 'jsonwebtoken';
import { Md5 } from 'md5-typescript';
import { validationResult } from 'express-validator/check';

const postRegister = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return Http.BadRequestResponse(res, { errors: errors.array() });
    }
    const user = new User({
        email: req.body.email,
        password: Md5.init(req.body.password)
    });
    user.save()
        .then((rs: any) => {
            if (!rs) {
                return Http.UnauthorizedResponse(res);
            }
            // create a token
            const token = jwt.sign({ id: user.id }, 'secret', {
                expiresIn: 86400 // expires in 24 hours
            });
            return Http.SuccessResponse(res, {
                token: token
            });
        })
        .catch((e: any) => {
            console.error(e);
            return Http.InternalServerResponse(res);
        });
};

const postLogin = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return Http.BadRequestResponse(res, { errors: errors.array() });
    }
    User.findOne({
        username: req.body.username,
        password: Md5.init(req.body.password)
    })
        .then((user: any) => {
            if (!user) {
                return Http.UnauthorizedResponse(res);
            }
            // create a token
            const token = jwt.sign({ id: user.id }, 'secret', {
                expiresIn: 86400 // expires in 24 hours
            });
            return Http.SuccessResponse(res, {
                token: token
            });
        })
        .catch((err: any) => {
            console.error(err);
            return Http.InternalServerResponse(res);
        });
};

export { postRegister, postLogin };
