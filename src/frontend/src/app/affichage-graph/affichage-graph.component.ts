import { Component} from '@angular/core';
import { BarStudentRangeComponent } from './components/bar-student-range/bar-student-range.component';
import { dataFromJson } from '../types';
import { JaugeStudentRangeComponent } from './components/jauge-student-range/jauge-student-range.component';
import { QuestionnaireBarStudentRanngeComponent } from './components/q-bar-student-range/q-bar-student-range.component';
import { QuestionnaireJaugeStudentRangeComponent } from './components/q-jauge-student-range/q-jauge-student-range.component';
import { KaggleDescriptionComponent } from '../kaggle-description/kaggle-description.component';
import { QuestionnaireDescriptionComponent } from '../questionnaire-description/questionnaire-description.component';

@Component({
  selector: 'app-affichage-graph',
  standalone: true,
  imports: [BarStudentRangeComponent, JaugeStudentRangeComponent,QuestionnaireBarStudentRanngeComponent, QuestionnaireJaugeStudentRangeComponent,KaggleDescriptionComponent,QuestionnaireDescriptionComponent],
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
