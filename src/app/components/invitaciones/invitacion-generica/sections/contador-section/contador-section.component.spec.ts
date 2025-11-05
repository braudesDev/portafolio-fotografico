import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorSectionComponent } from './contador-section.component';

describe('ContadorSectionComponent', () => {
  let component: ContadorSectionComponent;
  let fixture: ComponentFixture<ContadorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
