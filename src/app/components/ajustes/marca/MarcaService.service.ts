import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Marca } from '../../model/Marca.model';




@Injectable()
export class MarcaService{

  lstMarcas: Marca[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarMarcas(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarMarca(id: number, idnegocio: number, marca: Marca){

    const body = {
      id: id,
      nommarca: marca.nommarca,
      status: Number(marca.status) === 1 ? 'Activo' : 'Inactivo',
      codnegocio: idnegocio,
      
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
  eliminarMarca(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarmarca(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
