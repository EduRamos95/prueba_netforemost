import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'index',
        loadChildren: () => import('./views/pages/home/home.routes').then(c => c.HOME_ROUTES)
    },
    {
        path: 'details',
        loadChildren: () => import('./views/pages/details/details.routes').then(c => c.DETAILS_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'index'
    }
];
