import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

// const AUTH_API = 'http://infinitebackup.gigas.com:9080/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public global = inject(GlobalService);


  constructor(private http: HttpClient) {}

  login(username: string, password: string, partenrId:number): Observable<any> {
    return this.http.post(
      this.global.PORTAL_API_URL()+'/Auth/' + 'Login',
      {
          Email: username,
          Password: password,
          PartnerId: partenrId
      },
      this.global.httpOptions()
    );
  }


    logout(): Observable<any> {
    return this.http.get('/api/auth/logout');
  }


  public isLoggedIn(): boolean {
    let accesToken = localStorage.getItem("AccessToken");
    // const user = window.sessionStorage.getItem(USER_KEY);
    if (accesToken) {
      return true;
    }
    return false;
  }
}
