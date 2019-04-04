import Chats from '@controllers/chat';
import * as SocketIO from 'socket.io';
import * as SocketIOSession from 'express-socket.io-session';

class Socket {
    private io: SocketIO.Server;
    private session: any;
    private chatsController: Chats;

    constructor(io: SocketIO.Server, session: any) {
        this.io = io;
        this.session = session;
        this.chatsController = new Chats();
        this.listen();
    }

    private listen(): void {
        // this.io.use(SocketIOSession(this.session));

        var allIO = this.io.of('/all');
        allIO.on('connection', (socket: any) => {
            this.chatsController.chatAll(allIO, socket);
        });

        var chatIO = this.io.of('/chat').use(SocketIOSession(this.session));
        chatIO.on('connection', (socket: any) => {
            this.chatsController.chatWith(chatIO, socket);
        });

        var roomIO = this.io.of('/room');
        roomIO.on('connection', (socket: any) => {
            this.chatsController.chatRoom(roomIO, socket);
        });
    };
};

export default Socket;
