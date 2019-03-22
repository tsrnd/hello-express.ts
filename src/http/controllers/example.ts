import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
    return res.end(
        JSON.stringify({
            msg: 'Welcome'
        })
    );
};

export { index };
