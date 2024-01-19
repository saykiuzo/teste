import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _api_url: string = 'http://infinitebackup.gigas.com';
  private _api_port: string = '9080';


  public PORTAL_API_URL(): string {
    if (this._api_url) {
      return this._api_url + ":" + this._api_port;
    }
    return location.protocol + '//' + location.hostname + ":" + this._api_port;
  }

  public httpOptions(): any{
    return new HttpHeaders({ 'Content-Type': 'application/json' });

  }

  constructor() { }

}
