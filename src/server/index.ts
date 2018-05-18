import { Server } from 'module/server';

const bundle = require('../../dist/server/main');

const server = new Server();
server.init();
server.registerSSR(bundle);
server.start();
