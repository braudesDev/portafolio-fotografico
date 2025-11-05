import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaSectionComponent } from './historia-section.component';

describe('HistoriaSectionComponent', () => {
  let component: HistoriaSectionComponent;
  let fixture: ComponentFixture<HistoriaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
