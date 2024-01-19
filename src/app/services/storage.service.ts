import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    console.log('Borro los datos de localsotarage y session');
    window.localStorage.clear();
    localStorage.removeItem('AccessToken');
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    this.clean();
    localStorage.setItem("AccessToken", "Bearer " + user.AccessToken);
    localStorage.setItem("RefreshToken", "Bearer " + user.RefreshToken);
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private   auth_config = {
    headers: {
      authorization: localStorage.getItem("AccessToken"),
      refresh: localStorage.getItem("RefreshToken"),
  }
}
  public AUTH_CONFIG(): any {
    return this.auth_config
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
