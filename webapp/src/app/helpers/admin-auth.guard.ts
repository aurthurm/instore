import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../constants/constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.Token;
    if (!!token) {
      const user = this.authService.User;
      if (user.roles.includes(Role.SU_ADMIN)) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
