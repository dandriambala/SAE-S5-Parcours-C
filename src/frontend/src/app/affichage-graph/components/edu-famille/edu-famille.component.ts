import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { dataFromJson } from '../../../types'; // Typage des données JSON
import { GraphService } from '../../../graph.service';
import { BarChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-edu-famille',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './edu-famille.component.html',
})
export class EduFamilleComponent {
  @Input({ required: true }) data: dataFromJson = []; // Données injectées depuis un autre composant
  view: [number, number] = [1200, 500];
  xAxisLabel = 'Tranche de notes';
  yAxisLabel = 'Effectifs';

  moyenneEduParents: number = 0;

  constructor(private readonly graphService: GraphService) {}

  // Calcul de la moyenne lorsqu'il y a un changement de données

  // Méthode pour calculer la moyenne de l'éducation des parents
  calculateAverageEducation(): void {
    const totalEducation = this.data.reduce((acc, student) => {
      return acc + (student.Medu ?? 0) + (student.Fedu ?? 0); // S'assure que Medu/Fedu existent
    }, 0);

    const totalParents = this.data.length * 2; // Deux parents par étudiant
    this.moyenneEduParents = totalEducation / totalParents;
  }
}
