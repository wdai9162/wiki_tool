import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAuthorComponent } from './land-author.component';
import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';
describe('LandAuthorComponent', () => {
  let component: LandAuthorComponent;
  let fixture: ComponentFixture<LandAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
