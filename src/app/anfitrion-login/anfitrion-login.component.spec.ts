import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfitrionLoginComponent } from './anfitrion-login.component';

describe('AnfitrionLoginComponent', () => {
  let component: AnfitrionLoginComponent;
  let fixture: ComponentFixture<AnfitrionLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnfitrionLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnfitrionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
