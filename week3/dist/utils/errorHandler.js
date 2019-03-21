"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    InternalServerResponse(res, data = { message: 'Internal Server Error' }) {
        res.status(500).json(data);
    }
    BadRequestResponse(res, data = { message: 'Bad Request' }) {
        res.status(400).json(data);
    }
    UnauthorizedResponse(res, data = { message: 'Unauthorized' }) {
        res.status(401).json(data);
    }
    ForbiddenResponse(res, data = { message: 'Forbidden' }) {
        res.status(403).json(data);
    }
    SuccessResponse(res, data) {
        res.status(200).json(data);
    }
    NotFoundResponse(res, data = { message: '404 Not Found' }) {
        res.status(404).json(data);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map