import app from './app';
import { db } from './utils/db';

app.server.listen(3000, () => {
    console.log('server is running listening on port ' + 3000);
});

db.once('open', () => {
    console.log('connect mongodb success.');
});
