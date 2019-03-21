"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes_1 = require("./routes/userRoutes");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.routePrv = new userRoutes_1.Routes();
        this.database = 'mongodb://localhost:27017/user';
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        // mongoose.connect(this.database, { useNewUrlParser: true });
        mongoose.connect('mongodb://localhost:27017/user');
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map