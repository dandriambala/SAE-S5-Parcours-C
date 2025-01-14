import { Component, OnInit, Input } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import {schoolData, dataFromJson, DatasetItem, StudentRange, SeriesItem} from '../../../types';
import { StudentDataService } from '../../../services/student.service';  // Importer le service
import { GraphService } from '../../../graph.service';


@Component({
  selector: 'app-bar-student-range',
  standalone: true,
  imports: [BarChartModule,FormsModule],
  templateUrl: './bar-student-range.component.html',
  styleUrl: './bar-student-range.component.css',
})
export class BarStudentRangeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = [];
  /**
   * Object properties
   * **/

  //Global
  students: schoolData[] = [];
  chartData: any[] = [];
  combinedChartData: any[] = [];
  studentRanges: StudentRange[] = []

  //Education des parents
  education = [
    { name: "éducation : faible", value: 1 },
    { name: "éducation : moyennement faible", value: 2 },
    { name: "éducation : moyennement élevée", value: 3 },
    { name: "éducation : élevée", value: 4 }
  ];

  educationCheckboxes: { [key: string]: boolean } = {
    '4': false,
    '3': false,
    '2': false,
    '1': false,
  };

  //Alcool
  alcool = [
    { name: "alcool : jamais", value: 1 },
    { name: "alcool : occasionnellement", value: 2 },
    { name: "alcool : régulièrement", value: 3 }
  ];

  //Jeux vidéo
  jeuVideo = [
    { name: "jeux vidéos : jamais", value: 1 },
    { name: "jeux vidéos : occasionnellement", value: 2 },
    { name: "jeux vidéos : régulièrement", value: 3 }
  ];

  //BarChart Settings
  view: [number, number] = [900, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 180
  yScaleMin = 0

  //Colors
  customColors = [
    { name: 'total', value: 'rgba(105, 127, 253)' },
    { name: 'éducation : élevée', value: 'rgb(0, 81, 255)' },
    { name: 'éducation : moyennement élevée', value: 'rgb(38, 0, 252)' },
    { name: 'éducation : moyennement faible', value: 'rgb(191, 5, 248)' },
    { name: 'éducation : faible', value: 'rgb(250, 0, 0)' },
    { name: "parent.s : monoparental", value: 'rgb(0, 38, 255)' },
    { name: "parent.s : mariés", value: 'rgb(38, 0, 252)' },
    { name: "parent.s : divorcés", value: 'rgb(191, 5, 248)' },
    { name: "alcool : jamais", value: 'rgb(0, 81, 255)' },
    { name: "alcool : occasionnellement", value: 'rgb(38, 0, 252)' },
    { name: "alcool : régulièrement", value: 'rgb(191, 5, 248)' },
    { name: "jeux vidéos : jamais", value: 'rgb(0, 81, 255)' },
    { name: "jeux vidéos : occasionnellement", value: 'rgb(38, 0, 252)' },
    { name: "jeux vidéos : régulièrement", value: 'rgb(191, 5, 248)' }
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

      this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData)
    });
  }

  private getStudentRangeSummary(): { name: string, series: { name: string, value: number }[] }[] {

    return this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: 'total', value: range.list.length }
      ]
    }));

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


  /**
   * Fonctions pour éducation
   */


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

  private getEduLevelName(value: number): string {
    return this.education.find(id => id.value === value)?.name || 'N/A';
  }

  private getStudentRangePerParentEducationLevel(parentEduLvl: number) {

    if (!parentEduLvl) return this.chartData

    const tabEdu = this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: this.getEduLevelName(parentEduLvl), value: range.list.filter(x => this.calculateAverageParentEdu(x) == parentEduLvl).length }
      ]
    }));

    return tabEdu

  }

  private getAllStudentRangePerParentEducationLevel() {

    let tabEdu: any[] = []
    let tabFinal: any[] = []

    for (const edu of this.education) {
      tabEdu = this.getStudentRangePerParentEducationLevel(edu.value)
      tabFinal = [...tabFinal, ...tabEdu];
    }

    return [...this.chartData, ...tabFinal]

  }

  onParentEducationLevelToggle(value: number, event: Event): void {

    const inputElement = event.target as HTMLInputElement; // Cast de l'élément cible

    if (inputElement.checked) {
      // Ajouter les données si la checkbox est cochée
      const newChartData = this.getStudentRangePerParentEducationLevel(value);
      this.chartData = [...this.chartData, ...newChartData];
    } else {
      // Retirer les données si la checkbox est décochée
      this.chartData = this.chartData.map(item => ({
        name: item.name,
        series: item.series.filter((seriesItem: SeriesItem) =>
          seriesItem.name !== this.getEduLevelName(value)
        )
      })).filter(item => item.series.length > 0); // Retirer les objets vides
    }

    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  onAllParentEducationLevelToggle(value: number, event: Event): void {

    const isChecked = (event.target as HTMLInputElement).checked;
    // Cocher ou décocher toutes les cases
    Object.keys(this.educationCheckboxes).forEach(key => {
      this.educationCheckboxes[key] = isChecked;
    });
    
    this.chartData = this.getStudentRangeSummary();
    this.chartData = this.getAllStudentRangePerParentEducationLevel()
    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  onDeselectAll(): void {
    Object.keys(this.educationCheckboxes).forEach(key => {
      this.educationCheckboxes[key] = false;  
    });

    // Réinitialiser les données du graphique à leur état initial
  this.chartData = this.getStudentRangeSummary();
  this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

}
