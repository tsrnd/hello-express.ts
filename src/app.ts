import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/userRoutes";
import * as mongoose from 'mongoose';

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public database: string = 'mongodb://db:27017/user';
    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
    } 

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        // mongoose.connect(this.database, { useNewUrlParser: true });
        mongoose.connect('mongodb://db:27017/user', { useNewUrlParser: true });
    }
}

export default new App().app;
