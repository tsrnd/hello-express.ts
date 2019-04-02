import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Routes } from './routes/routes';
import { createServer, Server } from 'http';
import * as SocketIO from 'socket.io';

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
        this.io = SocketIO(this.server);
    }
    private listen(): void {
        let users = [];
        let io = this.io;
        io.on('connection', function (socket) {
            console.log('A user connected');
            socket.on('setUsername', function (data) {
                console.log(data);
                if (users.indexOf(data) > -1) {
                    socket.emit('userExists', data + ' username is taken! Try some other username.');
                } else {
                    users.push(data);
                    socket.emit('userSet', { username: data });
                }
            });
            socket.on('msg', function (data) {
                // Send message to everyone
                io.sockets.emit('newmsg', data);
            });
        });
    }


}

export default new App();
