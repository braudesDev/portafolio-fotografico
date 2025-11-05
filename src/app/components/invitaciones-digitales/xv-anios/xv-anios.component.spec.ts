import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XvAniosComponent } from './xv-anios.component';

describe('XvAniosComponent', () => {
  let component: XvAniosComponent;
  let fixture: ComponentFixture<XvAniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XvAniosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XvAniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
