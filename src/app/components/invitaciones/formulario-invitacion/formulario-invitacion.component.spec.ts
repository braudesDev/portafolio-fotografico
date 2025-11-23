import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInvitacionComponent } from './formulario-invitacion.component';

describe('FormularioInvitacionComponent', () => {
  let component: FormularioInvitacionComponent;
  let fixture: ComponentFixture<FormularioInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInvitacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
