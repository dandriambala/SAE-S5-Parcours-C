import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AffichageGraphComponent } from './affichage-graph/affichage-graph.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavComponent } from './nav/nav.component';
import { FooterAppComponent } from './footer-app/footer-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,FooterAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
