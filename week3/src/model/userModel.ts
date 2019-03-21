import * as mongoose from 'mongoose';

// const Schema = mongoose.Schema;

export const UserSchema =  new mongoose.Schema({
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
