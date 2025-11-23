import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionSectionComponent } from './confirmacion-section.component';

describe('ConfirmacionSectionComponent', () => {
  let component: ConfirmacionSectionComponent;
  let fixture: ComponentFixture<ConfirmacionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
