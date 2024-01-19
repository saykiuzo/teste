import { Injectable, inject } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public global = inject(GlobalService);

  constructor(private http: HttpClient) { }

  register(body: any) {
    console.log(body);
    return this.http.post('http://localhost:3000/api/register', body);
  }

}
