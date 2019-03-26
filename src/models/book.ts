import * as mongoose from 'mongoose';

export interface IBook extends mongoose.Document {
    name: String;
    decription: String;
    userId: mongoose.Types.ObjectId;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

const schema: any = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date
});

export default mongoose.model<IBook>('Book', schema);
