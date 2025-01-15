import { Component, OnInit, Input, NgModule } from '@angular/core';
import { GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts'; // Module de jauge de ngx-charts
import { schoolData, dataFromJson} from '../../../types';
import { StudentDataService } from '../../../services/student.service'; // Service des données
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-jauge-student-range',
  standalone: true,
  imports: [GaugeModule, NgxChartsModule, BrowserModule],
  templateUrl: './jauge-student-range.component.html',
  styleUrls: ['./jauge-student-range.component.css'],
})
export class JaugeStudentRangeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = []; // Liste des étudiants en entrée

  students: schoolData[] = [];
  // Données de la jauge
  gaugeData: any = {
    name: 'Moyenne Générale',
    value: 0,
  };

  // Configuration de la jauge
  gaugeSettings = {
    min: 0,
    max: 20,
    units: 'Points',
    angleSpan: 240,
    startAngle: -120,
    showAxis: true,
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    },
  };

  constructor(private studentDataService: StudentDataService) {}

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;
      this.loadGaugeData();
    })
  }

  private loadGaugeData(): void {
    // Calculer la moyenne générale des étudiants
    if (this.students.length > 0) {
      const totalGrades = this.students.reduce((sum, student) => {
        const avg = (student.G1 + student.G2 + student.G3) / 3;
        return sum + avg;
      }, 0);

      const average = totalGrades / this.students.length;
      this.gaugeData.value = parseFloat(average.toFixed(2));
    } else {
      this.gaugeData.value = 0; // Valeur par défaut
    }
  }
}
