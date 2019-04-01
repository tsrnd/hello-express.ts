import App from './app';
import * as util from 'util';

const port = process.env.APP_PORT || 3000;

App.getConnect().listen(port, () => {
    console.log(util.format('Server is running on port %d', port));
});
