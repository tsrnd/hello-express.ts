import Chats from '@controllers/chat';
import * as SocketIO from 'socket.io';
import * as store from 'store';

class Socket {
    private io: SocketIO.Server;
    // private client: any;
    private chatsController: Chats;

    constructor(io: SocketIO.Server) {
        this.io = io;
        this.chatsController = new Chats();
        this.listen();
    }

    private listen(): void {
        var allIO = this.io.of('/all');
        allIO.on('connection', (socket: any) => {
            this.chatsController.chatAll(allIO, socket)
        });

        var chatIO = this.io.of('/chat')
        chatIO.on('connection', (socket: any) => {
            console.log(socket.id);
            console.log('Client connected room chat:', socket.id);

            socket.on('message', (m: any, n: any) => {
                console.log('[server](message): %s', JSON.stringify(m), n);
                store.set(n.name, socket.id);

                let toID = store.get(n.toName)
                if (toID) {
                    chatIO.to(socket.id).emit('message', m);
                    chatIO.to(toID).emit('message', m);
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        var roomIO = this.io.of('/room');
        roomIO.on('connection', (socket: any) => {
            console.log(socket.id);
            console.log('Client connected room:', socket.id);

            socket.on('connectToServer', (data: any) => {
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
    };
};

export default Socket;
