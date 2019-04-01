import * as mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
    from: mongoose.Types.ObjectId;
    to: String;
    content: String;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

const schema: any = new mongoose.Schema({
    from: mongoose.Types.ObjectId,
    content: String,
    to: String,
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

export default mongoose.model<IMessage>('Message', schema);
