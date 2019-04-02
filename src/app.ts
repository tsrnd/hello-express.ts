import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';


class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public server: Server;
    public io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.socket();
        this.listen();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.set('view engine', 'pug');
        this.app.use(express.static(__dirname + '/public'));
        this.app.set('views', __dirname + '/views');
    }

    private socket(): void {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.io.on('connection', (socket: any) => {
            console.log('a user connected');

            socket.on('message',  (msg) => {
                console.log('message: ' + msg);
                this.io.emit('message', msg);

            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default new App();
