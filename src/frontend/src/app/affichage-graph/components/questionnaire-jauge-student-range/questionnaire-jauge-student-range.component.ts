import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Module de jauge de ngx-charts
import { schoolDataQuestionnaire, dataFromJson } from '../../../types';
import { StudentDataService } from '../../../services/student.service'; // Service des données
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionnaire-jauge-student-range',
  standalone: true,
  imports: [NgxChartsModule, FormsModule, CommonModule],
  templateUrl: './questionnaire-jauge-student-range.component.html',
  styleUrls: ['./questionnaire-jauge-student-range.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionnaireJaugeStudentRangeComponent implements OnInit {
  @Input({ required: true }) data: dataFromJson = []; // Liste des étudiants en entrée

  students: schoolDataQuestionnaire[] = [];
  overallAverage: any[] = [];

  // Temps de jeu
  tempsJeu = [
    { name: "Ne joue pas", value: 0, value_name: 'Je ne joue pas' },
    { name: "Temps de jeu : 1 - 2 h", value: 1, value_name: '1-2 heures' },
    { name: "Temps de jeu : 2 - 3 h", value: 2, value_name: '2-3 heures' },
    { name: "Temps de jeu : + 4 h", value: 4, value_name: '+ 4 heures' }, //uniquement sm
    { name: "Temps de jeu : 4 - 6 h", value: 4, value_name: "4-6 heures" }, //uniquement we
    { name: "Temps de jeu : + 7 h", value: 7, value_name: "+ 7 heures" } //uniquement we
  ];

  tempsJeuCumule = [
    { name: "Ne joue pas", value: 0 },
    { name: "Temps de jeu : > 1 h", value: 1 },
    { name: "Temps de jeu :  > 2 h", value: 2 },
    { name: "Temps de jeu : > 3 h", value: 3 },
    { name: "Temps de jeu : > 4 h", value: 4 },
    { name: "Temps de jeu : > 5 h", value: 5 },
    { name: "Temps de jeu : > 6 h", value: 6 },
    { name: "Temps de jeu : > 7 h", value: 7 },
    { name: "Temps de jeu : > 8 h", value: 8 },
    { name: "Temps de jeu : > 9 h", value: 9 },
    { name: "Temps de jeu : > 10 h", value: 10 },
    { name: "Temps de jeu : > 11 h", value: 11 }
  ];

  // Temps loisir
  tempsHobby = [
    { name: "Temps de loisir : < 1 h", value: 0, value_name: "Moins d'1 heure" },
    { name: "Temps de loisir : 1 - 2 h", value: 1, value_name: '1-2 heures' },
    { name: "Temps de loisir : 2 - 3 h", value: 2, value_name: '2-3 heures' },
    { name: "Temps de loisir : 3 - 4 h", value: 3, value_name: '3-4 heures' },
    { name: "Temps de loisir : 4 - 5 h", value: 4, value_name: '4-5 heures' },
    { name: "Temps de loisir : + 5 h", value: 5, value_name: 'Plus de 5h' }
  ];


  tempsHobbyCumule = [
    { name: "Temps de loisir : < 1 h", value: 0 },
    { name: "Temps de loisir : > 1 h", value: 1 },
    { name: "Temps de loisir :  > 2 h", value: 2 },
    { name: "Temps de loisir : > 3 h", value: 3 },
    { name: "Temps de loisir : > 4 h", value: 4 },
    { name: "Temps de loisir : > 5 h", value: 5 },
    { name: "Temps de loisir : > 6 h", value: 6 },
    { name: "Temps de loisir : > 7 h", value: 7 },
    { name: "Temps de loisir : > 8 h", value: 8 },
    { name: "Temps de loisir : > 9 h", value: 9 },
    { name: "Temps de loisir : > 10 h", value: 10 }
  ];

  //Temps autres
  tempsOther = [
    { name: "Temps aux autres activités : < 1 h", value: 0, value_name: "Moins d'1 heure" },
    { name: "Temps aux autres activités : 1 - 2 h", value: 1, value_name: '1-2 heures' },
    { name: "Temps aux autres activités : 2 - 3 h", value: 2, value_name: '2-3 heures' },
    { name: "Temps aux autres activités : + 4 h", value: 4, value_name: 'Plus de 4 heures' },
  ];

  tempsOtherCumule = [
    { name: "Temps aux autres activités : < 1 h", value: 0 },
    { name: "Temps aux autres activités : > 1 h", value: 1 },
    { name: "Temps aux autres activités :  > 2 h", value: 2 },
    { name: "Temps aux autres activités : > 3 h", value: 3 },
    { name: "Temps aux autres activités : > 4 h", value: 4 }
  ];

  //Notes

  Notes = [
    { name: "[0-8[", value_min: 0, value_max: 8 },
    { name: "[8-10[", value_min: 8, value_max: 10 },
    { name: "[10-12[", value_min: 10, value_max: 12 },
    { name: "[12-16[", value_min: 12, value_max: 16 },
    { name: "[16-20]", value_min: 16, value_max: 20 },
  ];
  customColors = [
    { name: 'Moyenne maximale', value: '#997A8D' }, 
    { name: 'Moyenne minimale', value: '#3B5068' }
  ];

  // Niveaux sélectionnés pour les curseurs
  cursorValue: number = 0;
  activeTab: 'jeu' | 'loisir' | 'ménage' = 'jeu';
  activeAverageTab: 'general' | 'english' = 'general'; // Par défaut, sur "Moyenne générale"

  avgMin: number = 0;
  avgMax: number = 0;

  constructor(private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.studentDataService.getStudentDataQuestionnaire().subscribe((data: schoolDataQuestionnaire[]) => {
      this.students = data;
      this.updateOverallAverage(this.getStudentsFirstPart());
    });
  }


  updateOverallAverage(filteredStudents: schoolDataQuestionnaire[]): void {
    const avgMin = this.calculateOverallMin(filteredStudents);
    const avgMax = this.calculateOverallMax(filteredStudents);

    this.avgMin = avgMin;
    this.avgMax = avgMax;
  }

  calculateOverallMin(students: schoolDataQuestionnaire[]): number {
    let totalMin = 0;
    let count = 0;

    students.forEach((student) => {
      const grade = this.activeAverageTab === 'general' ? student.avg_grade : student.english_grade; // Choix de la note
      const note = this.Notes.find((n) => n.name === grade);

      if (note) {
        totalMin += note.value_min;
        count++;
      }
    });
    return count === 0 ? 0 : totalMin / count;
  }

  calculateOverallMax(students: schoolDataQuestionnaire[]): number {
    let totalMax = 0;
    let count = 0;

    students.forEach((student) => {
      const grade = this.activeAverageTab === 'general' ? student.avg_grade : student.english_grade; // Choix de la note
      const note = this.Notes.find((n) => n.name === grade);

      if (note) {
        totalMax += note.value_max;
        count++;
      }
    });

    return count === 0 ? 0 : totalMax / count;
  }

  valueFormatter(value: number): string {
    return `${value.toFixed(2)}`;
  }

  calculateOverallAverage(tab: schoolDataQuestionnaire[]) {
    if (tab.length === 0) {
      return { avg_min: 0, avg_max: 0 };; // Éviter une division par zéro
    }

    let totalMin = 0;
    let totalMax = 0;
    let count = 0;

    tab.forEach((student) => {
      const grades = [student.avg_grade, student.english_grade];

      grades.forEach((grade) => {
        const note = this.Notes.find((n) => n.name === grade);

        if (note) {
          totalMin += note.value_min;
          totalMax += note.value_max;
          count++;
        }
      });
    });

    if (count === 0) {
      return { avg_min: 0, avg_max: 0 }; // Aucun grade valide trouvé
    }

    return [{
      name: "Note minimale",
      value: totalMin / count
    },
    {
      name: "Note minimale",
      value: totalMax / count
    }];
  }

  // Basculer entre les onglets
  setActiveTab(tab: 'jeu' | 'loisir' | 'ménage'): void {
    this.activeTab = tab;
    const maxSliderValue = this.getMaxSliderValue();
    if (this.cursorValue > maxSliderValue) {
      this.cursorValue = maxSliderValue;
    }

    this.onSliderLevelToggle(); // Mettre à jour le filtre 
  }

  setAverageTab(tab: 'general' | 'english'): void {
    this.activeAverageTab = tab;

    // Recalcule les moyennes avec les nouvelles données
    this.updateOverallAverage(this.students);
  }

  // Appliquer le filtre en fonction de l'onglet actif

  getStudentsFirstPart() {
  
      let filteredStudents: schoolDataQuestionnaire[] = [];
  
      if (this.activeTab === 'jeu') {
        filteredStudents = this.students.filter((x) => {
          const gametimeValue =
            this.getTempsJeuValue(x.vgTimeSm) + this.getTempsJeuValue(x.vgTimeWe);
          return gametimeValue == 0;
        })
      }
      else if (this.activeTab === 'loisir') {
        filteredStudents = this.students.filter((x) => {
          const hobbytimeValue =
            this.getTempsHobbyValue(x.hobbyTimeSm) + this.getTempsHobbyValue(x.hobbyTimeWe);
          return hobbytimeValue == 0;
        });
      }
      else if (this.activeTab === 'ménage') {
        filteredStudents = this.students.filter((x) => {
          const othertimeValue =
            this.getTempsOtherValue(x.chordsTimeSm) +
            this.getTempsOtherValue(x.chordsTimeWe)
          return othertimeValue == 0;
        });
      }
      return filteredStudents
    }

  onSliderLevelToggle(): void {
    let filteredStudents: schoolDataQuestionnaire[] = [];
    if (this.activeTab === 'jeu') {
      if (this.cursorValue == 0) {
        filteredStudents = this.getStudentsFirstPart()
      }
      else {
      filteredStudents = this.students.filter((x) => {
        const gametimeValue =
          this.getTempsJeuValue(x.vgTimeSm) + this.getTempsJeuValue(x.vgTimeWe);
        return gametimeValue >= this.cursorValue;
      });
    }
    } else if (this.activeTab === 'loisir') {
      if (this.cursorValue == 0) {
        filteredStudents = this.getStudentsFirstPart()
      }
      else {
      filteredStudents = this.students.filter((x) => {
        const hobbytimeValue =
          this.getTempsHobbyValue(x.hobbyTimeSm) + this.getTempsHobbyValue(x.hobbyTimeWe);
        return hobbytimeValue >= this.cursorValue;
      });
    }
    } else if (this.activeTab === 'ménage') {
      if (this.cursorValue == 0) {
        filteredStudents = this.getStudentsFirstPart()
      }
      else {
      filteredStudents = this.students.filter((x) => {
        const othertimeValue =
          this.getTempsOtherValue(x.chordsTimeSm) +
          this.getTempsOtherValue(x.chordsTimeWe)
        return othertimeValue >= this.cursorValue;
      });
    }
    }

    // Mettre à jour les jauges avec les étudiants filtrés
    this.updateOverallAverage(filteredStudents);
  }

  getTempsJeuValue(val: string): number {
    const result = this.tempsJeu.find(x => x.value_name === val)?.value ?? 0; // Valeur par défaut si undefined
    return result;
  }

  getTempsHobbyValue(val: string): number {
    const result = this.tempsHobby.find(x => x.value_name === val)?.value ?? 0; // Valeur par défaut si undefined
    return result;
  }

  getTempsOtherValue(val: string): number {
    const result = this.tempsOther.find(x => x.value_name === val)?.value ?? 0; // Valeur par défaut si undefined
    return result;
  }


  getSliderLabel(): string {
    if (this.activeTab === 'jeu') {
      return this.tempsJeuCumule.find((item) => item.value === this.cursorValue)?.name || 'Inconnu';
    } else if (this.activeTab === 'loisir') {
      return this.tempsHobbyCumule.find((item) => item.value === this.cursorValue)?.name || 'Inconnu';
    } else if (this.activeTab === 'ménage') {
      return this.tempsOtherCumule.find((item) => item.value === this.cursorValue)?.name || 'Inconnu';
    }
    return 'Inconnu';
  }

  getMaxSliderValue(): number {
    if (this.activeTab === 'jeu') {
      return this.tempsJeuCumule.length - 1; // Dernier index dans tempsJeuCumule
    } else if (this.activeTab === 'loisir') {
      return this.tempsHobbyCumule.length - 1; // Dernier index dans tempsHobbyCumule
    } else if (this.activeTab === 'ménage') {
      return this.tempsOtherCumule.length - 1; // Dernier index dans tempsOtherCumule
    }
    return 0; // Valeur par défaut au cas où
  }

}


