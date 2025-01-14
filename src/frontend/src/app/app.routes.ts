import { Routes } from '@angular/router';
import { AffichageGraphComponent } from './affichage-graph/affichage-graph.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AProposComponent } from './a-propos/a-propos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'graphiques',
        component: AffichageGraphComponent
    },
    {
        path: 'a-propos',
        component: AProposComponent
    }
];
