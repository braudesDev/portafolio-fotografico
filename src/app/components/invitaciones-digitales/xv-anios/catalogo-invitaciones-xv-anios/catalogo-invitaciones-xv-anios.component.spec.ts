import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInvitacionesXvAniosComponent } from './catalogo-invitaciones-xv-anios.component';

describe('CatalogoInvitacionesXvAniosComponent', () => {
  let component: CatalogoInvitacionesXvAniosComponent;
  let fixture: ComponentFixture<CatalogoInvitacionesXvAniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoInvitacionesXvAniosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoInvitacionesXvAniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
