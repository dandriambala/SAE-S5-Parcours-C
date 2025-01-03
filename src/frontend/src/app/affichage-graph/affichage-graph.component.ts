import { Component, NgModule } from '@angular/core';
import {
  BarChartModule,
  LineChartModule,
  NgxChartsModule,
  NumberCardModule,
  PieChartModule,
} from '@swimlane/ngx-charts';

import { RouterOutlet } from '@angular/router';
import { EduFamilleComponent } from './components/edu-famille/edu-famille.component';
//import jsonData from '../../../assets/student.json';
@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [EduFamilleComponent],
  templateUrl: './affichage-graph.component.html',
  styleUrl: './affichage-graph.component.css'
})
export class AffichageGraphComponent {
  //data = jsonData as dataFromJson;
}
