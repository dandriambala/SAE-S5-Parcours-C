import { Component, OnInit } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { schoolData } from '../../../types';
import { StudentDataService } from '../../../services/student.service';  // Importer le service
import { GraphService } from '../../../graph.service';

@Component({
  selector: 'app-edu-famille',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './edu-famille.component.html',
})
export class EduFamilleComponent implements OnInit {
  students: schoolData[] = [];
  view: [number, number] = [1200, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 180
  yScaleMin = 0
  chartData: any[] = [];
  chartData2: any[] = [];
  niveauEduc : number = 4;
  combinedChartData: any[] = []
  customColors = [
    { name: 'Dataset 1', value: 'rgba(255, 99, 132, 0.5)' },  // Transparence 50% pour Dataset 1
    { name: 'Dataset 2', value: 'rgba(54, 162, 235, 1)' }      // Opacité complète pour Dataset 2
  ]

  constructor(private readonly graphService: GraphService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;
      this.chartData = this.numberStudentsPerRangeNotes();
      this.chartData2 = this.numberStudentsPerRangeNotesAndParentEdu(this.niveauEduc);
      this.combinedChartData = this.combined()
      console.log(this.combinedChartData)
    });
  }

  private calculateAverageParentEdu(student: schoolData): number {
    return Math.ceil((student.Medu + student.Fedu) / 2)
  }

  private studentsAverageGrades(): number {
    return this.students.reduce((note, student: schoolData) =>
      student.G1 + student.G2 + student.G3, 0) / 3
  }

  private calculateStudentAverageGrades(student: schoolData): number {
    return (student.G1 + student.G2 + student.G3) / 3
  }

  private numberStudentsPerRangeNotes() {
    //let dataset = [
    return [{ name: '< 5', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5).length },
    { name: '5 - 10', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10).length },
    { name: '10 - 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15).length },
    { name: '> 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15).length }
    ]

    //return this.graphStudentsPerRangeNotes(dataset)
  }

  private numberStudentsPerRangeNotesAndParentEdu(parentEduLvl: number) {

    //let dataset = 
    return [
      { name: '< 5', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '5 - 10', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '10 - 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '> 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15 && this.calculateAverageParentEdu(x) == parentEduLvl).length }
    ]

    //return this.graphStudentsPerRangeNotes(dataset)
  }

  private combined() {
    return [
      {
        name: 'Dataset 1',
        series: this.chartData
      },
      {
        name: 'Dataset 2',
        series: this.chartData2
      }
    ];
  }

  private graphStudentsPerRangeNotes(dataset: { name: string; value: number; }[]) {
    return this.graphService.toSingleData(
      dataset.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {} as { [key: string]: number })
    )
  }

}
