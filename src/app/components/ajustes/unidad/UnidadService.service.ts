import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UnidadMedida } from '../../model/UnidadMedida.model';




@Injectable()
export class UnidadService{

  lstUnidades: UnidadMedida[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarUnidades(codnegocio: string) {
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida';
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }
  guardarUnidad(id: number,idnegocio: number, unidad: UnidadMedida){
  
    const body = {
      id:  Number(id),
      abrevunidadmedida: unidad.abrevunidadmedida,
      nomunidadmedida: unidad.nomunidadmedida,
      status: Number(unidad.status) === 1 ? 'Activo' : 'Inactivo',
      codnegocio: idnegocio,
      
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarUnidad(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarUnidad(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
