import * as mongoose from 'mongoose';

export interface IChat extends mongoose.Document {
    message: String,
    from: mongoose.Schema.Types.ObjectId,
    room: String,
    members: [mongoose.Schema.Types.ObjectId],
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

const schema: any = new mongoose.Schema({
    message: {
        type: String
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
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

export default mongoose.model<IChat>('Chat', schema);
