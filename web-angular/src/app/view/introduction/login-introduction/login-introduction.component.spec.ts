import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIntroductionComponent } from './login-introduction.component';

describe('LoginIntroductionComponent', () => {
  let component: LoginIntroductionComponent;
  let fixture: ComponentFixture<LoginIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
