import { user } from 'mongoose';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
const siofu = require('socketio-file-upload');
import * as path from 'path';
import Message from '../models/message';

export default class EventHandle {
    private ioServer: any;
    private clients = [];
    private room = 'Room 1244';
    constructor(server: http.Server) {
        this.ioServer = socketIO(server);
    }
    setup = () => {
        this.ioServer.of('/chat').on('connection', (socket: any) => {
            socket.emit('connection');
            socket.join(this.room);

            socket.on('auth', (data: any) => {
                this.auth(socket, data);
            });

            socket.on('message', (data: any) => {
                const msg = new Message({
                    from: socket.user._id,
                    to: this.room,
                    content: data
                });
                msg.save()
                    .then((r: any) => {
                        console.log('saved');
                    })
                    .catch((e: any) => {
                        console.error(e);
                    });

                socket.to(this.room).emit('message', msg.content);
            });

            socket.on('typing', (isTyping: any) => {
                if (isTyping) {
                    socket.to(this.room).emit('typing', {
                        type: 'append',
                        content: socket.user.email
                    });
                } else {
                    socket.to(this.room).emit('typing', {
                        type: 'remove',
                        content: socket.user.email
                    });
                }
            });
            const uploader = new siofu();
            uploader.dir = path.join(__dirname, '/../../tmp');
            uploader.listen(socket);
            uploader.on('complete', event => {
                const msg = new Message({
                    from: socket.user._id,
                    to: this.room,
                    content: event.file.name.match(
                        /([^\s]+(\.(jpg|png|gif|bmp))$)/
                    )
                        ? '<img src=/download/' +
                          event.file.name +
                          ' alt=' +
                          event.file.name +
                          ' width="150px">'
                        : '<a href=/download/' +
                          event.file.name +
                          '>' +
                          event.file.name +
                          '</a>'
                });
                msg.save()
                    .then(r => {
                        console.log('saved');
                    })
                    .catch(e => {
                        console.error(e);
                    });
                socket.to(this.room).emit('message', msg.content);
                socket.emit('self message', msg.content);
            });
            socket.on('old message', data => {
                console.log(socket.user._id);
                const messages = Message.aggregate([
                    { $match: { to: this.room } },
                    {
                        $addFields: {
                            isSelf: {
                                $switch: {
                                    branches: [
                                        {
                                            case: {
                                                $eq: ['$from', socket.user._id]
                                            },
                                            then: true
                                        }
                                    ],
                                    default: false
                                }
                            }
                        }
                    }
                ])
                    .sort({ create_at: -1 })
                    .limit(data.limit)
                    .then(r => {
                        socket.emit('old message', r)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        });
    };
    auth(socket: any, data: any) {
        const authorizationHeader = data.token;
        if (authorizationHeader == undefined || authorizationHeader == '') {
            socket.emit('auth-fail', 'Authenticate fail.');
            return;
        }
        try {
            const decoded = jwt.verify(data.token, 'secret');
            User.findOne({ _id: decoded.id })
                .then(user => {
                    if (!user) {
                        socket.emit('auth-fail', 'Authenticate fail.');
                        return;
                    }

                    const client = this.clients.find(u => {
                        return u.user.email == user.email;
                    });

                    if (!client) {
                        this.clients.push({
                            user: user
                        });
                        this.ioServer.emit(
                            'welcome',
                            user.email + ' has join this conversation.'
                        );
                    }

                    socket.emit('info', {
                        user: user,
                        clients: this.clients,
                        room: this.room
                    });
                    socket.user = user;
                    return;
                })
                .catch(err => {
                    console.error(err);
                    socket.emit('server_error', 'Server error.');
                    return;
                });
        } catch (err) {
            console.log(err);
            socket.emit('auth-fail', 'Authenticate fail.');
            return;
        }
    }
}
