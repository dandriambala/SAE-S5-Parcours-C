import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AffichageGraphComponent } from './affichage-graph/affichage-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AffichageGraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
