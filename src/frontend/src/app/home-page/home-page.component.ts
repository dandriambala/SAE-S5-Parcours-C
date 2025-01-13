import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  // Valeurs dynamiques pour les cartes
  playersCount: number = 0; // Compteur pour "38.8 M"
  averageScore: number = 0; // Compteur pour "12/20"
  hoursPlayed: number = 0; // Compteur pour "2 H"
  daysCount: number = 0; // Compteur pour "1230 jours"

  ngOnInit() {
    // Démarrer les animations pour chaque carte
    this.animateCountUp('playersCount', 38.8, 3000); // Compter jusqu'à 38.8 M
    this.animateCountUp('averageScore', 12, 2000); // Compter jusqu'à 12
    this.animateCountUp('hoursPlayed', 2, 1500); // Compter jusqu'à 2
    this.animateCountUp('daysCount', 1230, 3000); // Compter jusqu'à 1230
  }

  // Fonction générique pour animer un compteur
  animateCountUp(property: string, targetValue: number, duration: number) {
    const stepTime = duration / targetValue; // Calcul du temps entre chaque incrément
    let currentValue = 0;

    const increment = () => {
      if (currentValue < targetValue) {
        currentValue++;
        (this as any)[property] = currentValue; // Mettre à jour dynamiquement la propriété
        setTimeout(increment, stepTime); // Recommencer après un délai
      } else {
        (this as any)[property] = targetValue; // S'assurer que la valeur finale est correcte
      }
    };

    increment();
  }
}
