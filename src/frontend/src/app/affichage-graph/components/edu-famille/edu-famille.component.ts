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
  niveauEduc: number = 4;
  combinedChartData: any[] = []
  studentRanges: StudentRange[] = []
  /*listStudentInf5: schoolData[] = []
  listStudent5to10: schoolData[] = []
  listStudent10to15: schoolData[] = []
  listStudentSup15: schoolData[] = []*/

  //BarCHart Settings
  view: [number, number] = [800, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 180
  yScaleMin = 0
  customColors = [
    { name: 'total', value: 'rgba(255, 99, 132, 0.5)' },  // Transparence 50% pour Dataset 1
    { name: 'education faible', value: 'rgba(54, 162, 235, 1)' }      // Opacité complète pour Dataset 2
  ]

  constructor(private readonly graphService: GraphService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentData().subscribe((data: schoolData[]) => {
      this.students = data;
      /*this.listStudentInf5 = this.students.filter(x => this.calculateStudentAverageGrades(x) < 5)
      this.listStudent5to10 = this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10)
      this.listStudent10to15 = this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15)
      this.listStudentSup15 = this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15)*/

      this.studentRanges = [
        { name: '<5', list: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5) },
        { name: '5 - 10', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10) },
        { name: '10 - 15', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15) },
        { name: '>15', list: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15) }
      ]

      this.chartData = this.numberStudentsPerRangeNotes();
      //this.chartData2 = this.numberStudentsPerRangeNotesAndParentEdu(this.niveauEduc);
      this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData)
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

    return [{
      name: '<5',
      series: [{ name: 'total', value: this.studentRanges.list.length }
      ]
    },
    {
      name: '5 - 10',
      series: [{ name: 'total', value: this.listStudent5to10.length }
      ]
    },
    {
      name: '10 - 15',
      series: [{ name: 'total', value: this.listStudent10to15.length }
      ]
    },
    {
      name: '>15',
      series: [{ name: 'total', value: this.listStudentSup15.length }
      ]
    }
    ]

  }

  private numberStudentsPerRangeNotesAndParentEdu(parentEduLvl: number) {

    /*return [
      { name: '< 5', value: this.students.filter(x => this.calculateStudentAverageGrades(x) < 5 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '5 - 10', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 5 && this.calculateStudentAverageGrades(x) < 10 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '10 - 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 10 && this.calculateStudentAverageGrades(x) < 15 && this.calculateAverageParentEdu(x) == parentEduLvl).length },
      { name: '> 15', value: this.students.filter(x => this.calculateStudentAverageGrades(x) >= 15 && this.calculateAverageParentEdu(x) == parentEduLvl).length }
    ]*/

    return [{
      name: '<5',
      series: [{ name: 'total', value: this.listStudentInf5.filter(x => this.calculateAverageParentEdu(x) == parentEduLvl).length }
      ]
    },
    {
      name: '5 - 10',
      series: [{ name: 'total', value: this.listStudent5to10.length }
      ]
    },
    {
      name: '10 - 15',
      series: [{ name: 'total', value: this.listStudent10to15.length }
      ]
    },
    {
      name: '>15',
      series: [{ name: 'total', value: this.listStudentSup15.length }
      ]
    }
    ]

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
