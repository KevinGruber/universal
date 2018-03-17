<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png" alt="Universal Angular" height="320"/>
</p>

# Angular Universal with Node Proxy [![Universal Angular](https://img.shields.io/badge/universal-angular2-brightgreen.svg?style=flat)](https://github.com/angular/universal)
> Server-Side Rendering for Angular

An Angular starter for Universal using TypeScript, Webpack in combination with a Node.js Proxy Server

> If you're looking for the Angular Universal repo go to [**angular/universal**](https://github.com/angular/universal)

## Getting Started

> This repo is built following the [Angular-CLI Wiki guide](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)

We're utilizing packages from the [Angular Universal @nguniversal](https://github.com/angular/universal) repo, such as [ng-module-map-ngfactory-loader](https://github.com/angular/universal/tree/master/modules/module-map-ngfactory-loader) to enable Lazy Loading.

---

### Build Time Prerender(prerender) Vs. Server Side Rendering(ssr)
This repo can be used in two diffrent ways.

**Prerender(prerender)** 
* Happens at build time
* Renders your application and replaces the dist index.html with a version rendered at the route `/`.

**Server-Side Rendering(ssr)**
* Happens at runtime
* Uses `renderModuleFactory` to render your application on the fly at the requested url.

---

### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `npm run start` which will start `ng serve && node proxy` - Client on `http://localhost:3100` and Node on `http://localhost:3101`.

### Production (also for testing SSR/Pre-rendering locally)
**`npm run build && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:3101`.

**`npm run build:prerender && npm run serve:prerender`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://localhost:8080`
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`


## Proxy Development

> The proxy uses Controllers and Services. You can easely extend it to also have views.

 - The Services and Controller are being registered at bootstrap by the server.
 - You can easily chain express configurations into the bootup sequence.
 - The configuration gets merged with the environment the server boots with `--env=prod`
 - There are to files in the main server folder index.ts and proxy.ts
    - The index.ts also includes the registerSSR and is meant to be used during compilation
    - The proxy.ts can be called with ts-node for example and is for development purpose

# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
