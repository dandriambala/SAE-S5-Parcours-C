import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from '../../../data';  // Assurez-vous d'importer correctement le fichier
import { MultipleData, schoolData } from '../../../types';

@Component({
  standalone: true,
  imports: [NgxChartsModule],
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
})

export class RadarChartComponent {
  schoolData: { G1: number; series: { name: string; value: number }[] }[] = []; // Type explicite de multi
  view: [number, number] = [700, 400];  // Largeur et hauteur du graphique

  // options du graphique
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';

  colorScheme = {
    name: 'cool' , // nom du schéma de couleur, peut être personnalisé
    selectable: true, // Permet de sélectionner ce schéma
    group: 'Ordinal', // Type de groupe, ici 'Ordinal' pour un schéma de couleurs ordonné
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // les couleurs du graphique
  };
  

  
  constructor() {
    Object.assign(this, { multi }); 
  }

  onSelect(event: any): void {
    console.log(event);
  }
  
}
