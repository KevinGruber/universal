import 'zone.js/dist/zone-node';
import 'reflect-metadata';

(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import * as Express from 'express';
import { enableProdMode } from '@angular/core';
import { Server } from './modules/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const server = new Server();

enableProdMode();

const DIST_FOLDER = join(process.cwd(), 'dist');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main.bundle');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

server.app.set('view engine', 'html');
server.app.set('views', join(DIST_FOLDER, 'browser'));

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

server.app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

server.app.get('*.*', Express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

server.app.get('*', (req, res, next) => {
  console.log(req.url, 'into index');
  if (req.url.startsWith('/jsapi')) { return next(); }
  res.render('index', { req });
});

server.start();
