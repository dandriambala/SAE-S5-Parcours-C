import { Component} from '@angular/core';
import { EduFamilleComponent } from './components/edu-famille/edu-famille.component';
import jsonData from '../../assets/student.json';
import { dataFromJson } from '../types';

@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [EduFamilleComponent],
  templateUrl: './affichage-graph.component.html',
  styleUrls: ['./affichage-graph.component.css'], 
})

export class AffichageGraphComponent {
 data = jsonData as dataFromJson ;
}
