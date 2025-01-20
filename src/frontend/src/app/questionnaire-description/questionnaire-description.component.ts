import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-questionnaire-description',
  standalone: true,
  imports: [NgIf],
  templateUrl: './questionnaire-description.component.html',
  styleUrl: './questionnaire-description.component.css'
})
export class QuestionnaireDescriptionComponent {
  showFullText: boolean = false;

  toggleText() {
    this.showFullText = !this.showFullText;
  }
}
