import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/route";
import * as mongoose from "mongoose";
import { createServer, Server } from 'http';
import * as SocketIO from 'socket.io';

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoURL: string = "mongodb://db/team2";
    public server: Server;
    public io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
        this.socket();
        this.listen();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/static", express.static("./../public"));
        this.app.set("views", __dirname + "/views");
        this.app.set("view engine", "pug");
    }
    private socket(): void {
        this.server = createServer(this.app);
        this.io = SocketIO(this.server);
    }
    private listen(): void {
        let users = [];
        var io = this.io
        io.on('connection', (socket: any) => {
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
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });
        var roomIO = this.io.of('/room');
        roomIO.on('connection', (socket: any) => {
            console.log(socket.id);
            console.log('Client connected room:', socket.id);

            socket.on('connectToServer', (data: any) => {
                 console.log(data);
                var room = "room-" + data.room
                socket.join(room);
                roomIO.in(room).emit('connectedToServer', `Server: ${data.name} are in ${room}`);
            });

            socket.on('message', (data: any) => {
                var room = "room-" + data.room
                roomIO.in(room).emit('message', data.name + ": " + data.message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        const db = mongoose.connect(this.mongoURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) throw err;
        });
        // mongoose.connection;
        console.log("Connect MongoDB successful!");
    }

}

export default new App();
