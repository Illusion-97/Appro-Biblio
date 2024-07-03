import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Router} from "@angular/router";
import {AuthResponse, AuthService, User} from "../../services/auth.service";
import {of} from "rxjs";
import SpyObj = jasmine.SpyObj;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: SpyObj<AuthService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['open'])
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: Router,
          useClass: RouterMock
        },
        {
          provide: AuthService,
          //useClass: AuthMock
          useValue: spy
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AuthService) as SpyObj<AuthService>
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service should not be undefined', () => {
    //@ts-ignore
    expect(component.service).toBeDefined()
  })

  it('should login from backend', () => {
    authServiceSpy.login.and.returnValue(of({} as AuthResponse))
    component.login(new HTMLFormElement())
    expect(authServiceSpy.login.calls.count()).toBe(1)
  })
});

class RouterMock {

}
class AuthMock {
  login(credential: Credential) {
    return of<AuthResponse>({accessToken: "", user: {} as User})
  }
}
