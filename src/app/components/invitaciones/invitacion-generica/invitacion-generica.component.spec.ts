import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionGenericaComponent } from './invitacion-generica.component';

describe('InvitacionGenericaComponent', () => {
  let component: InvitacionGenericaComponent;
  let fixture: ComponentFixture<InvitacionGenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionGenericaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitacionGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
