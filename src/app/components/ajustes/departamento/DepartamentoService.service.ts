import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../../model/Departamento.model';

@Injectable()
export class DepartamentoService{

  lstDepartamentos: Departamento[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarDepartamentos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/departamento';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  listarDepartamentosporPais(codnegocio: string, idpais: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/departamento/' + idpais;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
