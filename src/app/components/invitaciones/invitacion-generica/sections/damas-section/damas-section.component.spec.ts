import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamasSectionComponent } from './damas-section.component';

describe('DamasSectionComponent', () => {
  let component: DamasSectionComponent;
  let fixture: ComponentFixture<DamasSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamasSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
