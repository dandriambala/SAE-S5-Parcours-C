import { Routes } from '@angular/router';
import { AffichageGraphComponent } from './affichage-graph/affichage-graph.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EduFamilleComponent } from './affichage-graph/components/edu-famille/edu-famille.component';
import { RadarChartComponent } from './affichage-graph/components/radar-chart/radar-chart.component';

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
        path: 'edu-parent',
        component: EduFamilleComponent
    },
    {
        path: 'radar-chart',
        component: RadarChartComponent
    }
];
