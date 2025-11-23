import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PradrinosSectionComponent } from './padrinos-section.component';

describe('PradrinosSectionComponent', () => {
  let component: PradrinosSectionComponent;
  let fixture: ComponentFixture<PradrinosSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PradrinosSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PradrinosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
