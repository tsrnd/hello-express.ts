import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/route";
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoURL: string = "mongodb://db/team2";

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/static", express.static(__dirname + "/public"));
        this.app.set("views", __dirname + "/views");
        this.app.set("view engine", "pug");
    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        const db = mongoose.connect(this.mongoURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) throw err;
        });
        // mongoose.connection;
        console.log("Connect MongoDB successful!");
    }
}

export default new App().app;
