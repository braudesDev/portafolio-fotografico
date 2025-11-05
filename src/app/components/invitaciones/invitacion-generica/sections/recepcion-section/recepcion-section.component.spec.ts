import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionSectionComponent } from './recepcion-section.component';

describe('RecepcionSectionComponent', () => {
  let component: RecepcionSectionComponent;
  let fixture: ComponentFixture<RecepcionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
