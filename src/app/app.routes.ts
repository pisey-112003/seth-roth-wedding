import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Detail } from './component/detail/detail';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'detail', component: Detail},
    {path: '**', redirectTo: '/home'}
];
