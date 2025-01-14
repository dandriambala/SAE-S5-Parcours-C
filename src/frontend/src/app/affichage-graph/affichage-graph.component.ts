import { Component} from '@angular/core';
import { BarStudentRangeComponent } from './components/bar-student-range/bar-student-range.component';
import { PolarStudentRangeComponent } from './components/polar-student-range/polar-student-range.component';
import jsonData from '../../assets/student.json';
import { dataFromJson } from '../types';

@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [BarStudentRangeComponent, PolarStudentRangeComponent],
  templateUrl: './affichage-graph.component.html',
  styleUrls: ['./affichage-graph.component.css'], 
})

export class AffichageGraphComponent {
  data = jsonData as dataFromJson;

}
