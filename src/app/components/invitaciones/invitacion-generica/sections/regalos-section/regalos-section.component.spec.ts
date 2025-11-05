import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalosSectionComponent } from './regalos-section.component';

describe('RegalosSectionComponent', () => {
  let component: RegalosSectionComponent;
  let fixture: ComponentFixture<RegalosSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegalosSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegalosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
