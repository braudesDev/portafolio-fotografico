import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfitrionDashboardComponent } from './anfitrion-dashboard.component';

describe('AnfitrionDashboardComponent', () => {
  let component: AnfitrionDashboardComponent;
  let fixture: ComponentFixture<AnfitrionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnfitrionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnfitrionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
