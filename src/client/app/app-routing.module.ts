import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartResolve } from './pages/cart/cart.resolve.service';
import { CMSResolve } from './pages/cms/cms.resolver.service';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'cart/:id', loadChildren: './pages/cart/cart.module#CartModule',
        resolve: {
            cart: CartResolve
        }
    },
    {
        path: 'cp/:code',
        loadChildren: './pages/cms/cms.module#CMSModule',
        resolve: {
            cms: CMSResolve
        }
    },
    {
        path: 'not-found',
        loadChildren: './pages/not-found/not-found.module#NotFoundModule'
    },
    {path: 'lazy', loadChildren: './pages/lazy/lazy.module#LazyModule'},
    {path: 'lazy/nested', loadChildren: './pages/lazy/lazy.module#LazyModule'},
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [CartResolve, CMSResolve]
})
export class AppRoutingModule {
}
