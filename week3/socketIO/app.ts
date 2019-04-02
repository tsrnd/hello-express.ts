import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./route";
import * as mongoose from "mongoose";

class App {
    public app: express.Application; 
	public routes: Routes = new Routes();
	public mongoURL: string = "mongodb://localhost:27017/local";

	private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(__dirname + '/public'));
    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        const db = mongoose.connect(this.mongoURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) throw err;
        });
        // mongoose.connection;
        console.log("Connect MongoDB successful!");
	}
	
	constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }
}

export default new App().app;
