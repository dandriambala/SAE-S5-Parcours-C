import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireJaugeStudentRangeComponent } from './questionnaire-jauge-student-range.component';

describe('QuestionnaireJaugeStudentRangeComponent', () => {
  let component: QuestionnaireJaugeStudentRangeComponent;
  let fixture: ComponentFixture<QuestionnaireJaugeStudentRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireJaugeStudentRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireJaugeStudentRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
