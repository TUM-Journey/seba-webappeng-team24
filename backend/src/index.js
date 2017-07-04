import http from 'http';
import express from 'express';

import setupAuth from './bootstrap/auth.init';
import setupDatabase from './bootstrap/database.init';
import setupMiddleware from './bootstrap/middleware.init';
import setupResources from './bootstrap/resources.init';

import config from './config';

(async () => {
  // Init Express and HTTP Server
  const app = express();
  app.server = http.createServer(app);

  // Bootstrapping application
  const db = await setupDatabase(config);
  await setupMiddleware(app, config, db);
  await setupAuth(app, config, db);
  await setupResources(app, config, db);

  // Launching server
  await app.server.listen(config.get('server:port'), config.get('server:host'));

})().then(() => console.info('Server running on ' + config.get('server:host') + ':' + config.get('server:port')));
