import * as mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'mydb';
const DB_PORT = process.env.DB_PORT || '27017';

export default class DBConnection {
    connect() {
        mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true,
            useFindAndModify: false
        }).then(() => {
            console.log('Mongodb connected success.');
        }).catch((err: any) => {
            console.error('Connect error: ', err);
        })
    }
}
