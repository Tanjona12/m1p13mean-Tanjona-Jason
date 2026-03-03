import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'] as string | undefined;
  if (!requiredRole) return true; // si pas de role demandé

  if (auth.hasRole(requiredRole)) return true;

  // connecté mais mauvais rôle (ou pas connecté)
  if (!auth.isLoggedIn()) router.navigateByUrl('/login');
  else router.navigateByUrl('/'); // ou /forbidden
  return false;
};