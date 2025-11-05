import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosCasamosSectionComponent } from './nos-casamos-section.component';

describe('NosCasamosSectionComponent', () => {
  let component: NosCasamosSectionComponent;
  let fixture: ComponentFixture<NosCasamosSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosCasamosSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosCasamosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
