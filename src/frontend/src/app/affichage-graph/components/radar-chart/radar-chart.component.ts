import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StudentDataService } from '../../../services/student.service'; 

@Component({
  standalone: true,
  imports: [NgxChartsModule],
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
})
export class RadarChartComponent implements OnInit {
  multi: any[] = [];
  view: [number, number] = [700, 400];

  
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Élément';
  yAxisLabel: string = 'Valeur';
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;

  constructor(private studentService: StudentDataService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.studentService.getStudentData().subscribe((students) => {
      this.multi = students.slice(0, 5).map((student, index) => ({
        name: `Étudiant ${index + 1}`,
        series: [
          { name: 'Moyenne G1-G3', value: (student.G1 + student.G2 + student.G3) / 3 },
          { name: 'Absences', value: student.absences },
          { name: 'Temps libre', value: student.freetime },
          { name: 'Temps d\'étude', value: student.studytime },
          { name: 'Échecs', value: student.failures },
        ],
      }));
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
