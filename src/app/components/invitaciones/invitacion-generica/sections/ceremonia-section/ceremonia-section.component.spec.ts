import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremoniaSectionComponent } from './ceremonia-section.component';

describe('CeremoniaSectionComponent', () => {
  let component: CeremoniaSectionComponent;
  let fixture: ComponentFixture<CeremoniaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeremoniaSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeremoniaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
