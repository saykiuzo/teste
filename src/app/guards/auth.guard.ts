import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Observable, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../services/users.service';

export const authGuard2: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (authservice.isLoggedIn()) {
    return true;
  } else {
    const url = router.createUrlTree(['/login']);
    return url;
  }
};
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const userService = inject(UserService);
  const router = inject(Router);

  if (!storageService.isLoggedIn()) {
    const url = router.createUrlTree(['/login']);
    return url
  }

  return userService.getCurrentUser().pipe(
    switchMap((user) => userService.checkProfile(user.Profiles)),
    map((response) => {

      return true;
    }),
    catchError((error) => {
      console.log('Error:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const authGuardMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authservice = inject(AuthService);
  return authservice.isLoggedIn();
};
