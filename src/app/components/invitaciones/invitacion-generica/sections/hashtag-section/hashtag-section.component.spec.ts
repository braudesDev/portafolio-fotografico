import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagSectionComponent } from './hashtag-section.component';

describe('HashtagSectionComponent', () => {
  let component: HashtagSectionComponent;
  let fixture: ComponentFixture<HashtagSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashtagSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HashtagSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
