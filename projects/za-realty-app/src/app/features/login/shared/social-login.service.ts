import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  url: string;
  constructor(private http: HttpClient) { }
  Savesresponse(response : any)
  {
    this.url =  'http://localhost:64726/Api/Login/Savesresponse';
    return this.http.post(this.url, response);
  }
}
