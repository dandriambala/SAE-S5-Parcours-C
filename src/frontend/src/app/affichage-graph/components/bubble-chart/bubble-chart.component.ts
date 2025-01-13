import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../../../services/student.service'; 
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  imports: [NgxChartsModule],
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css'],
})

export class BubbleChartComponent implements OnInit {
  multi: any[] = [];
  view: [number, number] = [700, 400];
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Tranche des notes';
  yAxisLabel: string = 'Effectif des étudiants';
  animations: boolean = true;

  constructor(private studentService: StudentDataService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.studentService.getStudentData().subscribe((students) => {
      // Initialiser les tranches de notes
      const noteRanges = [
        { name: '< 5', absences: 0, freetime: 0, studytime: 0, failures: 0, studentCount: 0 },
        { name: '5-10', absences: 0, freetime: 0, studytime: 0, failures: 0, studentCount: 0 },
        { name: '10-15', absences: 0, freetime: 0, studytime: 0, failures: 0, studentCount: 0 },
        { name: '> 15', absences: 0, freetime: 0, studytime: 0, failures: 0, studentCount: 0 },
      ];

      // Calculer les données pour chaque tranche
      students.forEach((student: any) => {
        const moyenne = (student.G1 + student.G2 + student.G3) / 3;

        let rangeIndex = -1;
        if (moyenne < 5) {
          rangeIndex = 0;
        } else if (moyenne >= 5 && moyenne < 10) {
          rangeIndex = 1;
        } else if (moyenne >= 10 && moyenne < 15) {
          rangeIndex = 2;
        } else {
          rangeIndex = 3;
        }

        if (rangeIndex !== -1) {
          const range = noteRanges[rangeIndex];
          range.absences += student.absences;
          range.freetime += student.freetime;
          range.studytime += student.studytime;
          range.failures += student.failures;
          range.studentCount++;
        }
      });

      // Construire les données pour le graphique
      this.multi = [
        {
          name: 'Absences',
          series: noteRanges.map((range) => ({
            name: range.name,
            x: range.name,
            y: range.studentCount,
            r: range.absences / (range.studentCount || 1),
          })),
        },
        {
          name: 'Temps libre',
          series: noteRanges.map((range) => ({
            name: range.name,
            x: range.name,
            y: range.studentCount,
            r: range.freetime / (range.studentCount || 1),
          })),
        },
        {
          name: 'Temps d\'étude',
          series: noteRanges.map((range) => ({
            name: range.name,
            x: range.name,
            y: range.studentCount,
            r: range.studytime / (range.studentCount || 1),
          })),
        },
        {
          name: 'Échecs',
          series: noteRanges.map((range) => ({
            name: range.name,
            x: range.name,
            y: range.studentCount,
            r: range.failures / (range.studentCount || 1),
          })),
        },
      ];
    });
  }

  onSelect(event: any): void {
    console.log('Bubble clicked:', event);
  }
}

