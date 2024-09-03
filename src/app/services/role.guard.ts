import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRole = route.data.role;
    const userRole = localStorage.getItem('userRole'); // Adjust as needed
    if (userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
