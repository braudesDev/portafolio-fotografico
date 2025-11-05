import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInvitacionesBodaComponent } from './catalogo-invitaciones-boda.component';

describe('CatalogoInvitacionesBodaComponent', () => {
  let component: CatalogoInvitacionesBodaComponent;
  let fixture: ComponentFixture<CatalogoInvitacionesBodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoInvitacionesBodaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoInvitacionesBodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
