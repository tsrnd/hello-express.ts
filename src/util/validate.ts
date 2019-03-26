import { check, body } from 'express-validator/check';
import User from '../models/user';

export const validate = (type: String) => {
    switch (type) {
        case POST_REGISTER:
            return [
                check('email').isEmail(),
                check('password').isLength({ min: 8 }),
                body('email').custom(e => {
                    return User.findOne({ email: e }).then((user: any) => {
                        if (user) {
                            return Promise.reject('E-mail already in use');
                        }
                    });
                })
            ];
        case POST_LOGIN:
            return [
                check('email').isEmail(),
                check('password').isLength({ min: 8 })
            ];
        default:
            break;
    }
};

export const POST_REGISTER = 'POST_REGISTER';
export const POST_LOGIN = 'POST_LOGIN';
