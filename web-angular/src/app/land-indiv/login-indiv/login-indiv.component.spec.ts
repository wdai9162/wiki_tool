import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIndivComponent } from './login-indiv.component';

describe('LoginIndivComponent', () => {
  let component: LoginIndivComponent;
  let fixture: ComponentFixture<LoginIndivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIndivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
