import { Response } from 'express';

export class ErrorHandler {
    public InternalServerResponse(res: Response, data = { message: 'Internal Server Error' }) {
        res.status(500).json(data);
    }

    public BadRequestResponse(res: Response, data = { message: 'Bad Request' }) {
        res.status(400).json(data);
    }

    public UnauthorizedResponse(res: Response, data = { message: 'Unauthorized' }) {
        res.status(401).json(data);
    }

    public ForbiddenResponse(res: Response, data = { message: 'Forbidden' }) {
        res.status(403).json(data);
    }

    public SuccessResponse(res: Response, data) {
        res.status(200).json(data);
    }

    public NotFoundResponse(res: Response, data = { message: '404 Not Found' }) {
        res.status(404).json(data);
    }
}