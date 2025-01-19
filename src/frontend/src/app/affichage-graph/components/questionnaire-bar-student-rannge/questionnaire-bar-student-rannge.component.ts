import { Component, OnInit, Input } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import {schoolData, dataFromJson, DatasetItem, StudentRange, SeriesItem, schoolDataQuestionnaire, StudentRangeQuestionnaire} from '../../../types';
import { StudentDataService } from '../../../services/student.service';  // Importer le service
import { GraphService } from '../../../graph.service';


@Component({
  selector: 'app-questionnaire-bar-student-rannge',
  standalone: true,
  imports: [BarChartModule,FormsModule],
  templateUrl: './questionnaire-bar-student-rannge.component.html',
  styleUrl: './questionnaire-bar-student-rannge.component.css',
})
export class QuestionnaireBarStudentRanngeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = [];
  /**
   * Object properties
   * **/

  //Global
  students: schoolDataQuestionnaire[] = [];
  chartData: any[] = [];
  combinedChartData: any[] = [];
  studentRanges: StudentRangeQuestionnaire[] = []

  //Etudes visées
  furtherStudy = [
    { name: "Niveau visé : Bac+2", value: 1, value_name: 'Bac+2'},
    { name: "Niveau visé : Bac+3", value: 2, value_name: 'Bac+3'},
    { name: "Niveau visé : Master", value: 3, value_name: 'Master'},
    { name: "Niveau visé : Diplome d'ingénieur", value: 4, value_name: "Diplome d'ingénieur" },
    { name: "Niveau visé : Doctorat", value: 5, value_name: 'Doctorat'}
  ];
  
  furtherStudyCheckboxes: { [key: string]: boolean } = {
    '5': false,
    '4': false,
    '3': false,
    '2': false,
    '1': false,
  };


  tabFilterCheckboxes = [this.furtherStudyCheckboxes]
  //BarChart Settings
  view: [number, number] = [900, 500];
  xAxisLabel = "Tranche de notes";
  yAxisLabel = "Effectif des étudiants";
  yScaleMax = 50
  yScaleMin = 0

  //Colors
  customColors = [
    { name: 'total', value: '#b06f8e' }, 
    { name: 'Niveau visé : Doctorat', value: '#a0557b' }, 
    { name: "Niveau visé : Diplome d'ingénieur", value: '#c27d9e' }, 
    { name: 'Niveau visé : Master', value: '#d894ae' }, 
    { name: 'Niveau visé : Bac+3', value: '#eab1c4' }, 
    { name: "Niveau visé : Bac+2", value: '#a0557b' }
  ];

  constructor(private readonly graphService: GraphService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentDataQuestionnaire().subscribe((data: schoolDataQuestionnaire[]) => {
      this.students = data;

      this.studentRanges = [
        { name: '< 8', list: this.students.filter(x => x.avg_grade  === "[0-8[" ) },
        { name: '8 - 10', list: this.students.filter(x => x.avg_grade  === "[8-10[") },
        { name: '10 - 12', list: this.students.filter(x => x.avg_grade  === "[10-12[") },
        { name: '12 - 16', list: this.students.filter(x => x.avg_grade  === "[12-16[") },
        { name: '>16', list: this.students.filter(x => x.avg_grade  === "[16-20[") }
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
  }

   /**
   * Fonctions pour furtherStudy
   */

   private getfurtherStudyLevelName(value: number): string {
    return this.furtherStudy.find(id => id.value === value)?.name || 'N/A';
  }
   private getfurtherStudyLevelValueName(value: number): string {
    return this.furtherStudy.find(id => id.value === value)?.value_name || 'N/A';
  }

  private getStudentRangePerfurtherStudyLevel(furtherStudyLvl: number) {

    if (!furtherStudyLvl) return this.chartData

    const tab = this.studentRanges.map(range => ({
      name: range.name,
      series: [
        { name: this.getfurtherStudyLevelName(furtherStudyLvl), value: range.list.filter(x => x.target_education === this.getfurtherStudyLevelValueName(furtherStudyLvl)).length }
      ]
    }));

    return tab

  }

  private getAllStudentRangePerfurtherStudyLevel() {

    let tabDebut: any[] = []
    let tabFinal: any[] = []

    for (const f of this.furtherStudy) {
      tabDebut = this.getStudentRangePerfurtherStudyLevel(f.value)
      tabFinal = [...tabFinal, ...tabDebut];
    }

    return [...this.chartData, ...tabFinal]

  }

  onfurtherStudyLevelToggle(value: number, event: Event): void {

    const inputElement = event.target as HTMLInputElement; // Cast de l'élément cible

    if (inputElement.checked) {
      // Ajouter les données si la checkbox est cochée
      const newChartData = this.getStudentRangePerfurtherStudyLevel(value);
      this.chartData = [...this.chartData, ...newChartData];
    } else {
      // Retirer les données si la checkbox est décochée
      this.chartData = this.chartData.map(item => ({
        name: item.name,
        series: item.series.filter((seriesItem: SeriesItem) =>
          seriesItem.name !== this.getfurtherStudyLevelName(value)
        )
      })).filter(item => item.series.length > 0); // Retirer les objets vides
    }

    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }

  onAllfurtherStudyLevelToggle(event: Event): void {

    this.onDeselectAll()
   
    const isChecked = (event.target as HTMLInputElement).checked;
    // Cocher ou décocher toutes les cases
    Object.keys(this.furtherStudyCheckboxes).forEach(key => {
      this.furtherStudyCheckboxes[key] = isChecked;
    });
   
    this.chartData = this.getStudentRangeSummary();
    this.chartData = this.getAllStudentRangePerfurtherStudyLevel()
    this.combinedChartData = this.sortStudentsDatasetPerRangeNotes(this.chartData);
  }
}
