import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireBarStudentRanngeComponent } from './questionnaire-bar-student-rannge.component';

describe('QuestionnaireBarStudentRanngeComponent', () => {
  let component: QuestionnaireBarStudentRanngeComponent;
  let fixture: ComponentFixture<QuestionnaireBarStudentRanngeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireBarStudentRanngeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireBarStudentRanngeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
