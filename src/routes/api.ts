import { validate, POST_REGISTER, POST_LOGIN } from './../util/validate';
import * as express from 'express';
import * as exampleController from '../http/controllers/example';
import * as userController from '../http/controllers/user';

const router = express.Router();

router.use((req: express.Request, res: express.Response, next: () => void) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// routes here
router.get('/example', exampleController.index);
router.post('/signup', validate(POST_REGISTER), userController.postRegister);
router.post('/login', validate(POST_LOGIN), userController.postLogin);

export default router;
