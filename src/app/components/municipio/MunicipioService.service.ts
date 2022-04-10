import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../model/Departamento.model';
import { Municipio } from '../model/Municipio.model';

@Injectable()
export class MunicipioService{

  lstMunicipios: Municipio[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarMunicipios(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/municipio';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  listarMunicipiosporDepartamento(codnegocio: string, iddepartamento: number){
   
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/municipio/' + iddepartamento;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
