import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import * as apiRouter from './routes/api';
import * as webRouter from './routes/web';
import DBConnection from './util/db';
import * as cookieParser from 'cookie-parser';
const siofu = require('socketio-file-upload');

const app = express();

// connect to db
const db = new DBConnection();
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    '/static',
    express.static(path.join(__dirname, '/../public'), { maxAge: 31557600000 })
);
app.use(
    '/download',
    express.static(path.join(__dirname, '/../tmp'), { maxAge: 31557600000 })
);
app.use(morgan('combined'));
app.use(cookieParser());
app.use(siofu.router);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../resources/views'));

app.use('/api', apiRouter.default);
app.use('/', webRouter.default);

export default app;
