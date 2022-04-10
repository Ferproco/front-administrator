import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'src/app/components/model/Pais.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaisService{

  lstPais: Pais[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarPais(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/pais';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
