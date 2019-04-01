import * as express from 'express';
import * as exampleController from '../http/controllers/example';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

// routes here
router.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
router.get('/room', (req, res) => {
  res.render('room', { title: 'Hey', message: 'Hello there!' });
});
router.post('/join', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: '12345678'
  });
  user
    .save()
    .then((rs: any) => {
      const token = jwt.sign({ id: user.id }, 'secret', {
        expiresIn: 86400
      });
      // res.cookie('token', token);
      res.redirect('/room?token=' + token, 302);
    })
    .catch((e: any) => {
      console.error(e);
      return res.status(500).end('internal server');
    });
});

export default router;
