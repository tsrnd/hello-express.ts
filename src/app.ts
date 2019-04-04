import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import Router from './routes/api';
import DBConnection from '@util/db';
import * as methodOverride from 'method-override';
import { createServer, Server } from 'http';
import * as SocketIO from 'socket.io';
import Socket from './socket/socket';
import * as passport from 'passport';
import * as expressSession from 'express-session';
import localPassport from '@util/passport';
import * as SocketIOSession from 'express-socket.io-session';

class App {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private db: DBConnection;
    private session: any;

    constructor() {
        this.initDB();
        this.createApp();
        this.configPassport();
        this.configApp();
        this.configRoute();
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
        // this.io.use(SocketIOSession(this.session, { autoSave: true }));
        new Socket(this.io, this.session);
    }

    private configPassport(): void {
        this.session = expressSession({ secret: 'secretkey', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true });
        this.app.use(this.session);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        var lPassport = new localPassport(passport);
        lPassport.config();
    }

    private configApp(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(methodOverride('_method'))
        this.app.use('/', express.static(path.join(__dirname, '/../public'), { maxAge: 31557600000 }));

        // this.app.use(morgan('combined'));
        this.app.set('view engine', 'pug');
    }

    private configRoute(): void {
        var router = new Router(passport);
        this.app.use(router.getRouter());
    }

    public getConnect(): Server {
        return this.server
    }
}

export default new App();
