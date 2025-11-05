import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionValidaSectionComponent } from './invitacion-valida-section.component';

describe('InvitacionValidaSectionComponent', () => {
  let component: InvitacionValidaSectionComponent;
  let fixture: ComponentFixture<InvitacionValidaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionValidaSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitacionValidaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
