import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsideracionesSectionComponent } from './consideraciones-section.component';

describe('ConsideracionesSectionComponent', () => {
  let component: ConsideracionesSectionComponent;
  let fixture: ComponentFixture<ConsideracionesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsideracionesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsideracionesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
