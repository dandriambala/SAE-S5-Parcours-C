import { Component} from '@angular/core';
import { BarStudentRangeComponent } from './components/bar-student-range/bar-student-range.component';
import { PolarStudentRangeComponent } from './components/polar-student-range/polar-student-range.component';
import jsonData from '../../assets/student.json';
import { dataFromJson } from '../types';
import { JaugeStudentRangeComponent } from './components/jauge-student-range/jauge-student-range.component';

@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [BarStudentRangeComponent, PolarStudentRangeComponent, JaugeStudentRangeComponent],
  templateUrl: './affichage-graph.component.html',
  styleUrls: ['./affichage-graph.component.css'], 
})

export class AffichageGraphComponent {
  selectedAnalyse: 'kaggle' | 'questionnaire' = 'kaggle';

  // Méthode appelée lorsqu'un bouton est cliqué
  onAnalyseChange(analyseType: 'kaggle' | 'questionnaire') {
    this.selectedAnalyse = analyseType;
  }
  data = jsonData as dataFromJson;

}
