import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionesDigitalesComponent } from './invitaciones-digitales.component';

describe('InvitacionesDigitalesComponent', () => {
  let component: InvitacionesDigitalesComponent;
  let fixture: ComponentFixture<InvitacionesDigitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionesDigitalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitacionesDigitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
