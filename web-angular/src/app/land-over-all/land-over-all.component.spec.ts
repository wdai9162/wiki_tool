import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandOverAllComponent } from './land-over-all.component';

describe('LandOverAllComponent', () => {
  let component: LandOverAllComponent;
  let fixture: ComponentFixture<LandOverAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandOverAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandOverAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
