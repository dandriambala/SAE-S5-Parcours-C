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
    { name: "Niveau : primaire", value: 1 },
    { name: "Niveau : collège", value: 2 },
    { name: "Niveau : lycée", value: 3 },
    { name: "Niveau : études supérieures", value: 4 }
  ];
  educationCheckboxes: { [key: string]: boolean } = {
    '4': false,
    '3': false,
    '2': false,
    '1': false,
  };

  //Sortie
  goout = [
    { name: "sortie extrascolaire : rarement", value: 1, valueMin: 1, valueMax: 2 },
    { name: "sortie extrascolaire : occasionnellement", value: 2, valueMin: 3, valueMax: 3 },
    { name: "sortie extrascolaire : régulièrement", value: 3, valueMin: 4, valueMax: 5 },
  ];
  gooutCheckboxes: { [key: string]: boolean } = {
    '3': false,
    '2': false,
    '1': false,
  };


  //Alcool
  alcool = [
    { name: "alcool : rarement", value: 1, valueMin: 1, valueMax: 2 },
    { name: "alcool : occasionnellement", value: 2, valueMin: 3, valueMax: 3 },
    { name: "alcool : régulièrement", value: 3, valueMin: 4, valueMax: 5 },
  ];
  alcoolCheckboxes: { [key: string]: boolean } = {
    '3': false,
    '2': false,
    '1': false,
  };

  tabFilterCheckboxes = [this.educationCheckboxes, this.gooutCheckboxes, this.alcoolCheckboxes]
  //BarChart Settings
  view: [number, number] = [900, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 180
  yScaleMin = 0

  //Colors
  customColors = [
    { name: 'total', value: '#b06f8e' }, 
    { name: 'Niveau : études supérieures', value: '#a0557b' }, 
    { name: 'Niveau : lycée', value: '#c27d9e' }, 
    { name: 'Niveau : collège', value: '#d894ae' }, 
    { name: 'Niveau : primaire', value: '#eab1c4' }, 
    { name: "sortie extrascolaire : rarement", value: '#a0557b' }, 
    { name: "sortie extrascolaire : occasionnellement", value: '#c27d9e' }, 
    { name: "sortie extrascolaire : régulièrement", value: '#d894ae' },
    { name: "alcool : rarement", value: '#a0557b' }, 
    { name: "alcool : occasionnellement", value: '#c27d9e' }, 
    { name: "alcool : régulièrement", value: '#d894ae' } 
  ];
  


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

  private calculateStudentAverageGrades(student: schoolData): number {
    return (student.G1 + student.G2 + student.G3) / 3
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

  onDeselectAll(): void {
    for (const filter of this.tabFilterCheckboxes){
    Object.keys(filter).forEach(key => {
      filter[key] = false;  
    });
  }

    // Réinitialiser les données du graphique à leur état initial
  this.chartData = this.getStudentRangeSummary();
  this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  console.log(this.combinedChartData)
  }

  /**
   * Fonctions pour éducation
   */


  private calculateAverageParentEdu(student: schoolData): number {
    return Math.ceil((student.Medu + student.Fedu) / 2)
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

  onAllParentEducationLevelToggle(event: Event): void {

    this.onDeselectAll()
    
    const isChecked = (event.target as HTMLInputElement).checked;
    // Cocher ou décocher toutes les cases
    Object.keys(this.educationCheckboxes).forEach(key => {
      this.educationCheckboxes[key] = isChecked;
    });
    
    this.chartData = this.getStudentRangeSummary();
    this.chartData = this.getAllStudentRangePerParentEducationLevel()
    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  /**
   * Fonctions pour sortie
   */

  private calculateAverageAlcool(student: schoolData): number {
    return Math.ceil((student.Dalc + student.Walc) / 2)
  }

  private getGoOutLevelName(value: number): string {
    return this.goout.find(id => id.value === value)?.name || 'N/A';
  }

  private getStudentRangePerGoOutLevel(goOutLvl : number, goOutValueMin: number, goOutValueMax: number) {

    if (!goOutLvl) return this.chartData

    const tabGoOut = this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: this.getGoOutLevelName(goOutLvl), value: range.list.filter(x => x.goout >= goOutValueMin && x.goout <= goOutValueMax).length }
      ]
    }));

    return tabGoOut

  }

  private getAllStudentRangePerGoOutLevel() {

    let tabGoOut: any[] = []
    let tabFinal: any[] = []

    for (const go of this.goout) {
      tabGoOut = this.getStudentRangePerGoOutLevel(go.value, go.valueMin, go.valueMax)
      tabFinal = [...tabFinal, ...tabGoOut];
    }

    return [...this.chartData, ...tabFinal]

  }

  onGoOutLevelToggle(value: number, valueMin: number, valueMax: number, event: Event): void {

    const inputElement = event.target as HTMLInputElement; // Cast de l'élément cible

    if (inputElement.checked) {
      // Ajouter les données si la checkbox est cochée
      const newChartData = this.getStudentRangePerGoOutLevel(value, valueMin, valueMax);
      this.chartData = [...this.chartData, ...newChartData];
    } else {
      // Retirer les données si la checkbox est décochée
      this.chartData = this.chartData.map(item => ({
        name: item.name,
        series: item.series.filter((seriesItem: SeriesItem) =>
          seriesItem.name !== this.getGoOutLevelName(value)
        )
      })).filter(item => item.series.length > 0); // Retirer les objets vides
    }

    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  onAllGoOutLevelToggle(event: Event): void {

    this.onDeselectAll()

    const isChecked = (event.target as HTMLInputElement).checked;
    // Cocher ou décocher toutes les cases
    Object.keys(this.gooutCheckboxes).forEach(key => {
      this.gooutCheckboxes[key] = isChecked;
    });
    
    this.chartData = this.getStudentRangeSummary();
    this.chartData = this.getAllStudentRangePerGoOutLevel()
    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }
  
  /**
   * Fonctions pour alcool
   */

  private getAlcoolLevelName(value: number): string {
    return this.alcool.find(id => id.value === value)?.name || 'N/A';
  }

  private getStudentRangePerAlcoolLevel(alcoolLvl : number, alcoolValueMin: number, alcoolValueMax: number) {

    if (!alcoolLvl) return this.chartData

    const tabAlcool = this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: this.getAlcoolLevelName(alcoolLvl), value: range.list.filter(x => this.calculateAverageAlcool(x) >= alcoolValueMin && this.calculateAverageAlcool(x) <= alcoolValueMax).length }
      ]
    }));

    return tabAlcool

  }

  private getAllStudentRangePerAlcoolLevel() {

    let tabAlcool: any[] = []
    let tabFinal: any[] = []

    for (const alc of this.alcool) {
      tabAlcool = this.getStudentRangePerAlcoolLevel(alc.value, alc.valueMin, alc.valueMax)
      tabFinal = [...tabFinal, ...tabAlcool];
    }

    return [...this.chartData, ...tabFinal]

  }

  onAlcoolLevelToggle(value: number, valueMin: number, valueMax: number, event: Event): void {

    const inputElement = event.target as HTMLInputElement; // Cast de l'élément cible

    if (inputElement.checked) {
      // Ajouter les données si la checkbox est cochée
      const newChartData = this.getStudentRangePerAlcoolLevel(value, valueMin, valueMax);
      this.chartData = [...this.chartData, ...newChartData];
    } else {
      // Retirer les données si la checkbox est décochée
      this.chartData = this.chartData.map(item => ({
        name: item.name,
        series: item.series.filter((seriesItem: SeriesItem) =>
          seriesItem.name !== this.getAlcoolLevelName(value)
        )
      })).filter(item => item.series.length > 0); // Retirer les objets vides
    }

    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  onAllAlcoolLevelToggle(event: Event): void {

    this.onDeselectAll()

    const isChecked = (event.target as HTMLInputElement).checked;
    // Cocher ou décocher toutes les cases
    Object.keys(this.alcoolCheckboxes).forEach(key => {
      this.alcoolCheckboxes[key] = isChecked;
    });
    
    this.chartData = this.getStudentRangeSummary();
    this.chartData = this.getAllStudentRangePerAlcoolLevel()
    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

}
