import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';  // Correct import
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Include RouterTestingModule to mock routing
      providers: [RoleGuard]  // Provide the RoleGuard
    });

    guard = TestBed.inject(RoleGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user role matches expected role', () => {
    // Mock the localStorage value
    spyOn(localStorage, 'getItem').and.returnValue('admin');  // Mock userRole as 'admin'
    
    const route = { data: { role: 'admin' } };  // Expected role
    expect(guard.canActivate(route)).toBe(true);  // Expect the guard to return true
  });

  it('should deny access and redirect when user role does not match expected role', () => {
    const navigateSpy = spyOn(router, 'navigate');  // Spy on the navigate function
    spyOn(localStorage, 'getItem').and.returnValue('user');  // Mock userRole as 'user'

    const route = { data: { role: 'admin' } };  // Expected role is 'admin'
    expect(guard.canActivate(route)).toBe(false);  // Expect the guard to return false
    expect(navigateSpy).toHaveBeenCalledWith(['']);  // Expect navigation to ''
  });
});
