import * as mongoose from 'mongoose';

// const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleteAt: Date
});