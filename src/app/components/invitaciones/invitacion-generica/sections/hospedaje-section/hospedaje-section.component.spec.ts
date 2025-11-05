import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedajeSectionComponent } from './hospedaje-section.component';

describe('HospedajeSectionComponent', () => {
  let component: HospedajeSectionComponent;
  let fixture: ComponentFixture<HospedajeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedajeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospedajeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
