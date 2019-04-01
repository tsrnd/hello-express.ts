import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import Router from './routes/api';
import DBConnection from '@util/db';
import * as methodOverride from 'method-override';
import { createServer, Server } from 'http';
import * as SocketIO from 'socket.io';
import Socket from './socket/socket';

class App {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private db: DBConnection;

    constructor() {
        this.createApp();
        this.initDB();
        this.configApp();
        this.createServer();
        this.createSocket();
    }

    private createApp(): void {
        this.app = express();
    }

    private initDB(): void {
        this.db = new DBConnection()
        this.db.connect();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private createSocket(): void {
        this.io = SocketIO(this.server);
        new Socket(this.io);
    }

    private configApp(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride('_method'))
        this.app.use('/', express.static(path.join(__dirname, '/../public'), { maxAge: 31557600000 }));
        // this.app.use(morgan('combined'));
        this.app.set('view engine', 'pug');
        this.app.use(Router.getRouter());
    }

    public getConnect(): Server {
        return this.server
    }
}

export default new App();
