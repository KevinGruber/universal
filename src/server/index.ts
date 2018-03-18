import { Server } from 'module/server';

const server = new Server();
server.init();
server.registerSSR();
server.start();
