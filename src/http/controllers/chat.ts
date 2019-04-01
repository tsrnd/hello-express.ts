import { Request, Response } from 'express';

class Chats {
    public index = function (req: Request, res: Response) {
        res.render('chats/index');
    };

    public chat = function (req: Request, res: Response) {
        res.render('chats/chat');
    };

    public chatAll = function (endpoint: any, socket: any) {
        console.log('Client connected room', socket.id);
        socket.on('message', (m: any) => {
            endpoint.emit('message', m)
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    }
};


export default Chats;
