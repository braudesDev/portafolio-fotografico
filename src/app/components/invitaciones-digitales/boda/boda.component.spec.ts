import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodaComponent } from './boda.component';

describe('BodaComponent', () => {
  let component: BodaComponent;
  let fixture: ComponentFixture<BodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
