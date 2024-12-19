import { Routes } from '@angular/router';
import { AffichageGraphComponent } from './affichage-graph/affichage-graph.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'graphiques',
        component: AffichageGraphComponent
    }
];
