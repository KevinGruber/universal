import { Server } from './module/server/server';

const server = new Server();
server.registerSSR();
server.start();
