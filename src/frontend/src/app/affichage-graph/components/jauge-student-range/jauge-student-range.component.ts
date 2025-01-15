import { Component, OnInit, Input, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Module de jauge de ngx-charts
import { schoolData, dataFromJson } from '../../../types';
import { StudentDataService } from '../../../services/student.service'; // Service des données
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-jauge-student-range',
  standalone: true,
  imports: [NgxChartsModule, FormsModule, MatSliderModule, CommonModule],
  templateUrl: './jauge-student-range.component.html',
  styleUrls: ['./jauge-student-range.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JaugeStudentRangeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = []; // Liste des étudiants en entrée

  students: schoolData[] = [];
  // Données de la jauge
  overallAverage: any[] = []

  //Temps de révision
  revision = [
    { name: "temps de révision : < 2 h", value: 1 },
    { name: "temps de révision : > 2 h", value: 2 },
    { name: "temps de révision : > 5 h", value: 3 },
    { name: "temps de révision : > 10 h", value: 4 }
  ];

  //Temps de révision
  trajet = [
    { name: "temps de trajet : < 15 min", value: 1 },
    { name: "temps de trajet : > 15 min", value: 2 },
    { name: "temps de trajet : > 30 min", value: 3 },
    { name: "temps de trajet : > 1 h", value: 4 }
  ];

   // Niveaux sélectionnés pour les curseurs
   revisionLevel: number = 1;
   trajetLevel: number = 1;

  constructor(private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;
      this.updateOverallAverage(this.students);
    })
  }

  updateOverallAverage(filteredStudents: schoolData[]): void {
    this.overallAverage = [
      {
        name: "Moyenne générale",
        value: this.calculateOverallAverage(filteredStudents),
      },
    ];
  }

  calculateOverallAverage(tab: schoolData[]): number {
    if (tab.length === 0) {
      return 0; // Éviter une division par zéro

    }
    const totalSum = tab.reduce((sum, student) => {
      const studentAverage = (student.G1 + student.G2 + student.G3) / 3;
      return sum + studentAverage;
    }, 0);

    return totalSum / tab.length;
  }

  onRevisionLevelToggle(): void {
    console.log('Niveau de révision sélectionné:', this.revisionLevel);
    const filteredStudents = this.students.filter((x) => x.studytime >= this.revisionLevel);
    this.updateOverallAverage(filteredStudents);
  }

  onTrajetLevelToggle(value: number): void {

    this.trajetLevel = value;
    const filteredStudents = this.students.filter((x) => x.traveltime >= value);
    this.updateOverallAverage(filteredStudents);

  }
}
