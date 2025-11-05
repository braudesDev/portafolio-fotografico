import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionesAdminComponent } from './invitaciones-admin.component';

describe('InvitacionesAdminComponent', () => {
  let component: InvitacionesAdminComponent;
  let fixture: ComponentFixture<InvitacionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
