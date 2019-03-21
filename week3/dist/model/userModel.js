"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
exports.UserSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});
//# sourceMappingURL=userModel.js.map