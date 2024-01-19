import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { GlobalService } from '../services/global.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  const storageservice = inject(StorageService);
  const globalservice = inject(GlobalService);

  if (storageservice.isLoggedIn()) {

    clonedRequest = req.clone({
      setHeaders: {
        authorization: localStorage.getItem("AccessToken")!,
        refresh: localStorage.getItem("RefreshToken")!,
    }

    });
  }
  return next(clonedRequest);
};
