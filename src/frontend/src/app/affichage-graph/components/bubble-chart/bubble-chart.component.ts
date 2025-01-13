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
  xAxisLabel: string = 'Temps libre (moyenne)';
  yAxisLabel: string = 'Temps d\'étude (moyenne)';
  animations: boolean = true;

  constructor(private studentService: StudentDataService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.studentService.getStudentData().subscribe((students) => {
      const noteRanges = [
        { name: '< 5', series: this.initializeCriteria() },
        { name: '5-10', series: this.initializeCriteria() },
        { name: '10-15', series: this.initializeCriteria() },
        { name: '> 15', series: this.initializeCriteria() },
      ];

      students.forEach((student) => {
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
          range.series[0].value += student.absences;
          range.series[1].value += student.freetime;
          range.series[2].value += student.studytime;
          range.series[3].value += student.failures;
          range.series[4].value++;
        }
      });

      const bubbleData = noteRanges.map((range) => {
        const absences = range.series.find((s) => s.name === 'Absences')?.value || 0;
        const freetime = range.series.find((s) => s.name === 'Temps libre')?.value || 0;
        const studytime = range.series.find((s) => s.name === 'Temps d\'étude')?.value || 0;
        const studentCount = range.series.find((s) => s.name === 'Nombre d\'étudiants')?.value || 1;

        return {
          name: range.name,
          x: freetime / studentCount,
          y: studytime / studentCount,
          r: studentCount,
        };
      });

      this.multi = [
        {
          name: 'Étudiants',
          series: bubbleData,
        },
      ];
    });
  }

  private initializeCriteria() {
    return [
      { name: 'Absences', value: 0 },
      { name: 'Temps libre', value: 0 },
      { name: 'Temps d\'étude', value: 0 },
      { name: 'Échecs', value: 0 },
      { name: 'Nombre d\'étudiants', value: 0 },
    ];
  }

  onSelect(event: any): void {
    console.log('Bubble clicked:', event);
  }
}

