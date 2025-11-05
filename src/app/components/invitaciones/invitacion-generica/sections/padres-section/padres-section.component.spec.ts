import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadresSectionComponent } from './padres-section.component';

describe('PadresSectionComponent', () => {
  let component: PadresSectionComponent;
  let fixture: ComponentFixture<PadresSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadresSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadresSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
