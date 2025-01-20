import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaggleDescriptionComponent } from './kaggle-description.component';

describe('KaggleDescriptionComponent', () => {
  let component: KaggleDescriptionComponent;
  let fixture: ComponentFixture<KaggleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KaggleDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KaggleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
