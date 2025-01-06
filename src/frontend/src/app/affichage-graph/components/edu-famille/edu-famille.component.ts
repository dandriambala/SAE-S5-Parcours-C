import { Component, Input, OnInit } from '@angular/core';
import { dataFromJson } from '../../../types';
import { BarChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-edu-famille',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './edu-famille.component.html',
})
export class EduFamilleComponent  implements OnInit {
  @Input({ required: true }) data: dataFromJson = [];

  view: [number, number] = [1200, 500];
  xAxisLabel = 'Niveau d\'éducation des parents';
  yAxisLabel = 'Moyenne des notes des étudiants';
  chartData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    /*
    console.log(this.data)
    const groupedData = this.groupStudentsByParentEducation();
    this.chartData = this.formatChartData(groupedData);
    */
  }
  
/*
  // Calculer la moyenne des trimestres pour chaque étudiant
  private calculateStudentAverages(): any[] {
    return this.data.map((student) => {
      const averageGrade = ((student.G1) + (student.G2) + (student.G3 )) / 3;
      const averageParentEdu = ((student.Medu) + (student.Fedu)) / 2;
      return {
        ...student,
        averageGrade,
        averageParentEdu,
      };
    });
  }

  // Grouper les étudiants par niveau d'éducation des parents
  private groupStudentsByParentEducation(): { range: string; avgGrade: number }[] {
    const ranges = [
      { range: '0 - 1', students: [] as any[] },
      { range: '1 - 2', students: [] as any[] },
      { range: '2 - 3', students: [] as any[] },
      { range: '3 - 4', students: [] as any[] },
    ];

    const studentsWithAverages = this.calculateStudentAverages();

    studentsWithAverages.forEach((student) => {
      const avgEdu = student.averageParentEdu;

      if (avgEdu >= 0 && avgEdu < 1) ranges[0].students.push(student.averageGrade);
      else if (avgEdu >= 1 && avgEdu < 2) ranges[1].students.push(student.averageGrade);
      else if (avgEdu >= 2 && avgEdu < 3) ranges[2].students.push(student.averageGrade);
      else if (avgEdu >= 3 && avgEdu <= 4) ranges[3].students.push(student.averageGrade);
    });

    return ranges.map((range) => {
      const total = range.students.reduce((sum, grade) => sum + grade, 0);
      const avgGrade = range.students.length ? total / range.students.length : 0;
      return { range: range.range, avgGrade };
    });
  }

  // Formater les données pour ngx-charts
  private formatChartData(groupedData: { range: string; avgGrade: number }[]): any[] {
    return groupedData.map((group) => ({
      name: group.range,
      value: group.avgGrade,
    }));
  }*/
}
