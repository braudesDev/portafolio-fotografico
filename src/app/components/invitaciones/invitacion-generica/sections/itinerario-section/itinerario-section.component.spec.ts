import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioSectionComponent } from './itinerario-section.component';

describe('ItinerarioSectionComponent', () => {
  let component: ItinerarioSectionComponent;
  let fixture: ComponentFixture<ItinerarioSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItinerarioSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItinerarioSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
