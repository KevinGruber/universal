import 'zone.js/dist/zone-node';
import 'reflect-metadata';

(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import * as Express from 'express';
import { enableProdMode, ValueProvider } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine';

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

server.app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    document: template,
    url: options.req.url,
    extraProviders: [
      <ValueProvider>{
        provide: REQUEST,
        useValue: options.req
      },
      <ValueProvider>{
        provide: RESPONSE,
        useValue: options.req.res,
      },
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

server.app.get('*.*', Express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

server.app.get('*', (req, res, next) => {
  if (req.url.startsWith('/jsapi')) { return next(); }
  res.render('index', { req, res });
});

server.start();
