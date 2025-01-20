import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaugeStudentRangeComponent } from './jauge-student-range.component';

describe('JaugeStudentRangeComponent', () => {
  let component: JaugeStudentRangeComponent;
  let fixture: ComponentFixture<JaugeStudentRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaugeStudentRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JaugeStudentRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
