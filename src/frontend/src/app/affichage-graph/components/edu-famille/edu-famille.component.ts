import { Component, OnInit } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { MultipleData, schoolData } from '../../../types';
import { StudentDataService } from '../../../services/student.service';  // Importer le service
import { GraphService } from '../../../graph.service';
import { DatasetItem, Dataset, StudentRange } from '../../../types';

@Component({
  selector: 'app-edu-famille',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './edu-famille.component.html',
})
export class EduFamilleComponent implements OnInit {
  //Object properties
  students: schoolData[] = [];
  chartData: any[] = [];
  parentEducationLevelSelected: number = 1;
  combinedChartData: any[] = []
  studentRanges: StudentRange[] = []
  tabLevelEdu = [
    { name: "éducation élevée", value: 4 },
    { name: "éducation moyennement élevée", value: 3 },
    { name: "éducation moyennement faible", value: 2 },
    { name: "éducation faible", value: 1 }
  ];

  //BarChart Settings
  view: [number, number] = [800, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 180
  yScaleMin = 0
  customColors = [
    { name: 'total', value: 'rgba(105, 127, 253, 0.14)' },
    { name: 'éducation élevée', value: 'rgb(0, 81, 255)' },
    { name: 'éducation moyennement élevée', value: 'rgb(38, 0, 252)' },
    { name: 'éducation moyennement faible', value: 'rgb(191, 5, 248)' },
    { name: 'éducation faible', value: 'rgb(250, 0, 0)' }
  ]

  constructor(private readonly graphService: GraphService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;

      this.studentRanges = [
        { name: '<5', list: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5) },
        { name: '5 - 10', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10) },
        { name: '10 - 15', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15) },
        { name: '>15', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15) }
      ]

      this.chartData = this.getStudentRangeSummary();

      //this.chartData = this.getStudentRangePerParentEducationLevel(this.parentEducationLevelSelected)

      this.chartData = this.getAllStudentRangePerParentEducationLevel()

      this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData)
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

  private getStudentRangeSummary(): { name: string, series: { name: string, value: number }[] }[] {

    return this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: 'total', value: range.list.length }
      ]
    }));

  }

  private getEduLevelName(value: number): string {
    return this.tabLevelEdu.find(level => level.value === value)?.name || 'N/A';
  }

  private getStudentRangePerParentEducationLevel(parentEduLvl: number) {

    const tabEdu = this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: this.getEduLevelName(parentEduLvl) , value: range.list.filter(x => this.calculateAverageParentEdu(x) == parentEduLvl).length }
      ]
    }));

    return [...this.chartData, ...tabEdu]

  }

  private getAllStudentRangePerParentEducationLevel() {

    let tabEdu: any[] = []
    let tabFinal: any[] = []

    for (const edu of this.tabLevelEdu) {
      tabEdu = this.getStudentRangePerParentEducationLevel(edu.value)
      tabFinal = [...tabFinal, ...tabEdu];
    }

    return [...this.chartData, ...tabFinal]

  }

  /*
  Transforme ça :
  [
    {
      name: '<5',
      series: [{ name: 'total', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5).length }]
    },
    {
      name: '<5',
      series: [name: 'education faible', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5 && this.calculateAverageParentEdu(x) == 1).length]
    },
    {
      name: '5 - 10',
      series: [{ name: 'total', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10).length },
      ]
    },
    {
      name: '5 - 10',
      series: [
        { name: 'education faible', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10 && this.calculateAverageParentEdu(x) == 1).length }
      ]
    }
    ...
  ];

  En ça : 

  [
    {
      name: '<5',
      series: [{ name: 'total', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5).length },
        { name: 'education faible', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5 && this.calculateAverageParentEdu(x) == 1).length }
      ]
    },
    {
      name: '5 - 10',
      series: [{ name: 'total', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10).length },
        { name: 'education faible', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10 && this.calculateAverageParentEdu(x) == 1).length }
      ]
    }
    ...
  ];
  */

  private sortStudentsDatasetPerRangeNotes(dataset: DatasetItem[]): DatasetItem[] {
    const mergedMap = new Map<string, { name: string; value: number }[]>();

    dataset.forEach((item) => {
      if (!mergedMap.has(item.name)) {
        mergedMap.set(item.name, [...item.series]);
      } else {
        // Ajouter les séries existantes au même nom
        const existingSeries = mergedMap.get(item.name)!;
        mergedMap.set(item.name, [...existingSeries, ...item.series]);
      }
    });

    // Convertir la Map en tableau
    return Array.from(mergedMap.entries()).map(([name, series]) => ({
      name,
      series,
    }));

  }
}
