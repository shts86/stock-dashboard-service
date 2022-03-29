import { app } from './app';
import config, { KnownConfigKey } from './utils/config';
config.init();

import { connectDb } from './middleware/store';
import { format } from 'util';

async function init() {
  await connectDb();

  const port = +config.get(KnownConfigKey.ServerPort, '3000');
  app.set('port', port);

  const server = app.listen(app.get('port'), () => {
    const address = format('http://localhost:%d', app.get('port'));
    console.log('  App is running at %s in %s mode', address, app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
}

init().catch((err) => console.log('Error', err));
