import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Module de jauge de ngx-charts
import { schoolData, dataFromJson } from '../../../types';
import { StudentDataService } from '../../../services/student.service'; // Service des données
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jauge-student-range',
  standalone: true,
  imports: [NgxChartsModule, FormsModule, CommonModule],
  templateUrl: './jauge-student-range.component.html',
  styleUrls: ['./jauge-student-range.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JaugeStudentRangeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = []; // Liste des étudiants en entrée

  students: schoolData[] = [];
  overallAverage: any[] = [];

  // Temps de révision
  revision = [
    { name: "Temps de révision : < 2 h", value: 1, value_name: '<2 hours' },
    { name: "Temps de révision : > 2 h", value: 2, value_name: '2 to 5 hours' },
    { name: "Temps de révision : > 5 h", value: 3, value_name: '5 to 10 hours' },
    { name: "Temps de révision : > 10 h", value: 4, value_name: '>10 hours' },
  ];

  // Temps de trajet
  trajet = [
    { name: "Temps de trajet : < 15 min", value: 1, value_name: '<15 min.' },
    { name: "Temps de trajet : > 15 min", value: 2, value_name: '15 to 30 min.' },
    { name: "Temps de trajet : > 30 min", value: 3, value_name: '30 min. to 1 hour' },
    { name: "Temps de trajet : > 1 h", value: 4, value_name: '>1 hour' },
  ];

  // Niveaux sélectionnés pour les curseurs
  cursorValue: number = 1;
  activeTab: 'trajet' | 'revision' = 'trajet';

  constructor(private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;
      this.updateOverallAverage(this.students);
    });
  }

  updateOverallAverage(filteredStudents: schoolData[]): void {
    this.overallAverage = [
      {
        name: 'Moyenne générale',
        value: this.calculateOverallAverage(filteredStudents),
      },
    ];
  }

  calculateOverallAverage(tab: schoolData[]): number {
    if (tab.length === 0) {
      return 0; // Éviter une division par zéro
    }
    const totalSum = tab.reduce((sum, student) => {
      let result: number = 0
      if (student.G1_por != null && student.G1_math != null)
        result = (student.G1_por + student.G2_por + student.G3_por + student.G1_math + student.G2_math + student.G3_math) / 6
      else if (student.G1_por != null)
        result = (student.G1_por + student.G2_por + student.G3_por) / 3
      else if (student.G1_math != null)
        result = (student.G1_math + student.G2_math + student.G3_math) / 3

      return sum + result;
    }, 0);

    return totalSum / tab.length;
  }

  // Basculer entre les onglets
  setActiveTab(tab: 'trajet' | 'revision'): void {
    this.activeTab = tab;
    this.onSliderLevelToggle(); // Applique le filtre dès que l'onglet change
  }

  // Appliquer le filtre en fonction de l'onglet actif

  onSliderLevelToggle(): void {
    let filteredStudents: schoolData[] = [];
    if (this.activeTab === 'trajet') {
      filteredStudents = this.students.filter((x) => 
        { 
          let traveltimeValue = this.trajet.filter(y => y.value_name === x.traveltime)[0].value
          return traveltimeValue >= this.cursorValue
      });
    } else if (this.activeTab === 'revision') {
      filteredStudents = this.students.filter((x) => { 
        let studytimeValue = this.revision.filter(y => y.value_name === x.studytime)[0].value
        return studytimeValue >= this.cursorValue
    });
    }
    this.updateOverallAverage(filteredStudents);
  }

  getSliderLabel(): string {
    if (this.activeTab === 'trajet') {
      return this.trajet.find((item) => item.value === this.cursorValue)?.name || 'Inconnu';
    } else if (this.activeTab === 'revision') {
      return this.revision.find((item) => item.value === this.cursorValue)?.name || 'Inconnu';
    }
    return 'Inconnu';
  }
}

