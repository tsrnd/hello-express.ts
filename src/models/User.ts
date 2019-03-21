import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});
