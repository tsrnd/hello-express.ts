import { Request, Response } from 'passport';
import usersModel from '@models/user';
import roomsModel from '@models/room';
import * as promise from 'bluebird';
import * as mongoose from 'mongoose';

class Chats {
    private modelUser: any;
    private modelRoom: any;

    constructor() {
        this.modelUser = promise.promisifyAll(usersModel);
        this.modelRoom = promise.promisifyAll(roomsModel);
    }

    public index = (req: Request, res: Response) => {
        res.render('chats/index', { user: req.user });
    };

    public chat = async (req: Request, res: Response) => {
        var user = await this.modelUser.findById(req.params.id);
        res.render('chats/chat', { user: req.user, toUser: user });
    };

    public room = (req: Request, res: Response) => {
        res.render('chats/room', { user: req.user });
    };

    public chatAll = (endpoint: any, socket: any) => {
        console.log('Client connected room', socket.id);
        socket.on('message', (m: any) => {
            endpoint.emit('message', m)
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    }

    public chatRoom = (endpoint: any, socket: any) => {
        console.log('Client connected room:', socket.id);
        socket.on('connectToServer', (data: any) => {
            var room = "room-" + data.room
            socket.join(room);
            endpoint.in(room).emit('connectedToServer', `Server: ${data.name} are in ${room}`);
        });

        socket.on('message', (data: any) => {
            var room = "room-" + data.room
            endpoint.in(room).emit('message', data.name + ": " + data.message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    }

    public chatWith = (endpoint: any, socket: any) => {
        console.log('Client connected room chat:', socket.id);

        socket.on('message', async (data: any) => {
            var user = await this.modelUser.findById(socket.handshake.session.passport.user);
            var arr = [data._id, user._id];
            var room = await this.modelRoom.findOne({ type: 1 }).all(
                'members', arr
            );
            if (!room) {
                room = await this.modelRoom.create({
                    name: "Chat",
                    members: arr
                }, { new: true });
                console.log("1", room);
            }
            console.log("2", room);
            await socket.join(room._id);
            await endpoint.in(room._id).emit('message', `${user.email}: ${data.message}`);
            console.log('[server](message): %s', JSON.stringify(data));
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    }
};

export default Chats;
