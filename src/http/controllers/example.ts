import { Request, Response } from 'express';
import * as Http from '@util/http';

class Example {
    public index = (req: Request, res: Response) => {
        return Http.SuccessResponse(res, {
            msg: 'Welcome'
        });
    };
};

export default new Example();
