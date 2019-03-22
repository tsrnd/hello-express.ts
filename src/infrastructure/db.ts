import * as mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST || 'locahost';
const DB_NAME = process.env.DB_NAME || 'mydb';
const DB_PORT = process.env.DB_PORT || '27107';

class DBConnection {
    connect() {
        mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true
        });
        const db = mongoose.connection;
        db.on('error', (err: any) => {
            console.error('Connect error: ', err);
        });
        db.once('open', function() {
            console.log('Mongodb connected success.');
        });
    }
}

export default DBConnection;
