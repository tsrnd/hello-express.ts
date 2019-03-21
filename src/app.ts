import * as express from 'express';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // some config
    }
}

export default new App().app;
