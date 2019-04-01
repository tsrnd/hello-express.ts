import app from './app';
import * as util from 'util';
import * as path from 'path';
import EventHandle from './eventHandles/event';

const port = process.env.APP_PORT || 3000;

const server = app.listen(port, () => {
  console.log(util.format('Server is running on port %d', port));
});

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./src/client/index.html'));
});

const event = new EventHandle(server);
event.setup();
