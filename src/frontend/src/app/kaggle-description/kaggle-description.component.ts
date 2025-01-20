import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kaggle-description',
  standalone: true,
  imports: [NgIf],
  templateUrl: './kaggle-description.component.html',
  styleUrl: './kaggle-description.component.css'
})
export class KaggleDescriptionComponent {
  showFullText: boolean = false;

  toggleText() {
    this.showFullText = !this.showFullText;
  }

}
