import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiramcionSectionComponent } from './confiramcion-section.component';

describe('ConfiramcionSectionComponent', () => {
  let component: ConfiramcionSectionComponent;
  let fixture: ComponentFixture<ConfiramcionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiramcionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiramcionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
