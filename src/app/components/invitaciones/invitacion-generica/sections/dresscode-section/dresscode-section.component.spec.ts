import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DresscodeSectionComponent } from './dresscode-section.component';

describe('DresscodeSectionComponent', () => {
  let component: DresscodeSectionComponent;
  let fixture: ComponentFixture<DresscodeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DresscodeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DresscodeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
