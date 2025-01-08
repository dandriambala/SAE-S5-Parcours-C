import { Component, OnInit } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { schoolData } from '../../../types';
import { StudentDataService } from '../../../services/student.service';  

@Component({
  selector: 'app-edu-famille',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './edu-famille.component.html',
  styleUrl: './edu-famille.component.css',
})
export class EduFamilleComponent implements OnInit {
  data: schoolData[] = [];  
  view: [number, number] = [900, 500];
  xAxisLabel = "Niveau d'éducation des parents";
  yAxisLabel = "Moyenne des notes des étudiants";
  chartData: any[] = [];
  situationFamiliale: string[] = [];
  alcool: string[] = [];
  jeuVideo: string[] = [];

  constructor(private studentDataService: StudentDataService) {} 

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((students: schoolData[]) => {
      this.data = students;  
      const groupedData = this.groupStudentsByParentEducation();
      this.chartData = this.formatChartData(groupedData);
    });
  }

  private calculateStudentAverages(): { parentEducation: number; averageGrade: number }[] {
    return this.data.map((student: schoolData) => {  
      const averageGrade = (student.G1 + student.G2 + student.G3) / 3;
      const parentEducation = (student.Medu + student.Fedu) / 2;
      return { parentEducation, averageGrade };
    });
  }

  private groupStudentsByParentEducation(): { range: string; avgGrade: number }[] {
    const ranges = [
      { range: '0 - 1', students: [] as number[] },
      { range: '1 - 2', students: [] as number[] },
      { range: '2 - 3', students: [] as number[] },
      { range: '3 - 4', students: [] as number[] },
    ];

    const studentsWithAverages = this.calculateStudentAverages();

    studentsWithAverages.forEach((student) => {
      const edu = student.parentEducation;

      if (edu >= 0 && edu < 1) ranges[0].students.push(student.averageGrade);
      else if (edu >= 1 && edu < 2) ranges[1].students.push(student.averageGrade);
      else if (edu >= 2 && edu < 3) ranges[2].students.push(student.averageGrade);
      else if (edu >= 3 && edu <= 4) ranges[3].students.push(student.averageGrade);
    });

    return ranges.map((range) => {
      const total = range.students.reduce((sum, grade) => sum + grade, 0);
      const avgGrade = range.students.length ? total / range.students.length : 0;
      return { range: range.range, avgGrade };
    });
  }

  private formatChartData(groupedData: { range: string; avgGrade: number }[]): any[] {
    return groupedData.map((group) => ({
      name: group.range,
      value: group.avgGrade,
    }));
  }
  

 
  testSituationFamiliale(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
     
      this.situationFamiliale.push(value);
    } else {
   
      this.situationFamiliale = this.situationFamiliale.filter((item) => item !== value);
    }

    console.log('Situation familiale sélectionnée :', this.situationFamiliale);

    if (this.situationFamiliale.includes('monoparental')) {
      console.log('Monoparental est sélectionné');
    }
    if (this.situationFamiliale.includes('marie')) {
      console.log('Marié.e est sélectionné');
    }
    if (this.situationFamiliale.includes('divorce')) {
      console.log('Divorcé.e est sélectionné');
    }
  }

 
  
  resetSelection() {
    this.situationFamiliale = [];
    this.alcool = [];
    this.jeuVideo = [];
    console.log('Toutes les sélections ont été réinitialisées');
  }

 

}
