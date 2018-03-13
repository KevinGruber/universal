import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';

import * as express from 'express';
import * as compression from 'compression';
import {join} from 'path';
import {readFileSync} from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));


// - Example Express Rest API endpoints -
app.get('/jsapi/v1/product/:code', (req, res) => {
  const {code} = req.params;
  console.log('code  ', code);
  switch (code) {
    case "12345":
      res.send({
        code: 12345,
        name: "iPhone5",
        brand: "Apple",
        price: {
          price: 800.00,
          formatedPrice: "EUR 800.00"
        },
        image: "http://lorempixel.com/640/480/technics/1"
      });
    default:
      res.send({
        code: 12234,
        name: "iPadAir3",
        brand: "Apple",
        price: {
          price: 1200.00,
          formatedPrice: "EUR 1200.00"
        },
        image: "http://lorempixel.com/640/480/technics/2"
      })
  }
});

// - Example Express Rest API endpoints -
app.get('/jsapi/v1/cart/:cartId', (req, res) => {
  const cartId = req.params;
  res.send({
    cardId: cartId,
    products: [
      {
        code: 12345,
        name: "iPhone5",
        brand: "Apple",
        price: {
          price: 800.00,
          formatedPrice: "EUR 800.00"
        },
        image: "http://lorempixel.com/640/480/technics/1"
      }
    ]
  })
});

// - Example Express Rest API endpoints -
app.post('/jsapi/v1/cart/:cartId', (req, res) => {
  const cartId = req.params;
  const { amount, code } = req.payload;
  res.send({
    cardId: cartId,
    products: [
      {
        code: 12345,
        name: "iPhone5",
        brand: "Apple",
        price: {
          price: 800.00,
          formatedPrice: "EUR 800.00"
        },
        image: "http://lorempixel.com/640/480/technics/1"
      }
    ]
  })
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
