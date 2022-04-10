import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'src/app/components/model/Pais.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService{

  uriapi: string = environment.urlAuthentication;

  constructor(private httpClient: HttpClient){

  }

  login(username: string, password: string){
    const body = {
        user: username,
        password: password
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'token';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
}