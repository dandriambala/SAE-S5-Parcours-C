import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  
  playersCount: number = 0;
  averageScore: number = 0; 
  hoursPlayed: number = 0;
  daysCount: number = 0; 

  ngOnInit() {
    // Démarrer les animations pour chaque carte
    this.animateCountUp('playersCount', 38.8, 3000); 
    this.animateCountUp('averageScore', 12, 2000); 
    this.animateCountUp('hoursPlayed', 2, 1500); 
    this.animateCountUp('daysCount', 1230, 3000); 
  }

  // Fonction générique pour animer un compteur
  animateCountUp(property: string, targetValue: number, duration: number) {
    const stepTime = duration / targetValue; 
    let currentValue = 0;

    const increment = () => {
      if (currentValue < targetValue) {
        currentValue++;
        (this as any)[property] = currentValue; 
        setTimeout(increment, stepTime); 
      } else {
        (this as any)[property] = targetValue; 
      }
    };

    increment();
  }
}
