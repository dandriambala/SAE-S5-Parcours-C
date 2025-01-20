import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireDescriptionComponent } from './questionnaire-description.component';

describe('QuestionnaireDescriptionComponent', () => {
  let component: QuestionnaireDescriptionComponent;
  let fixture: ComponentFixture<QuestionnaireDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
