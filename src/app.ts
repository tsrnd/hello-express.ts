import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import router from './routes/api';
import DBConnection from './infrastructure/db';

const app = express();

// connect to db
const db = new DBConnection();
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);
app.use(morgan('combined'));

app.use('/api', router);

export default app;
