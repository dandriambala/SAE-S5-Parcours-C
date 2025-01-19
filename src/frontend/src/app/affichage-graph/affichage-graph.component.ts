import { Component} from '@angular/core';
import { BarStudentRangeComponent } from './components/bar-student-range/bar-student-range.component';
import { dataFromJson } from '../types';
import { JaugeStudentRangeComponent } from './components/jauge-student-range/jauge-student-range.component';
import { QuestionnaireBarStudentRanngeComponent } from './components/questionnaire-bar-student-rannge/questionnaire-bar-student-rannge.component';
import { QuestionnaireJaugeStudentRangeComponent } from './components/questionnaire-jauge-student-range/questionnaire-jauge-student-range.component';

@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [BarStudentRangeComponent, JaugeStudentRangeComponent,QuestionnaireBarStudentRanngeComponent, QuestionnaireJaugeStudentRangeComponent],
  templateUrl: './affichage-graph.component.html',
  styleUrls: ['./affichage-graph.component.css'], 
})

export class AffichageGraphComponent {

  data : dataFromJson = [];

  selectedAnalyse: 'kaggle' | 'questionnaire' = 'kaggle';

  // Méthode appelée lorsqu'un bouton est cliqué
  onAnalyseChange(analyseType: 'kaggle' | 'questionnaire') {
    this.selectedAnalyse = analyseType;
  }


}
