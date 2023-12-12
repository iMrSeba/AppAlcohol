import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // Verificar si el token está presente
    const token = this.authService.getToken();

    // Si el token no está presente, redirigir a la página de inicio de sesión
    /** if (!token) {
      return this.router.createUrlTree(['/login']);
    }*/
    

    // Permitir acceso si el token está presente
    return true;
  }
}
