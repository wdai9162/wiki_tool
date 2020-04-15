import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthorComponent } from './login-author.component';

describe('LoginAuthorComponent', () => {
  let component: LoginAuthorComponent;
  let fixture: ComponentFixture<LoginAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
