import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarStudentRangeComponent } from './polar-student-range.component';

describe('PolarStudentRangeComponent', () => {
  let component: PolarStudentRangeComponent;
  let fixture: ComponentFixture<PolarStudentRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarStudentRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolarStudentRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
