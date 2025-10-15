import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XvNathaliaComponent } from './xv-nathalia.component';

describe('XvNathaliaComponent', () => {
  let component: XvNathaliaComponent;
  let fixture: ComponentFixture<XvNathaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XvNathaliaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XvNathaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
