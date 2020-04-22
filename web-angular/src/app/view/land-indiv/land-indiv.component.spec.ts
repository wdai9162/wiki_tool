import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandIndivComponent } from './land-indiv.component';

describe('LandIndivComponent', () => {
  let component: LandIndivComponent;
  let fixture: ComponentFixture<LandIndivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandIndivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
