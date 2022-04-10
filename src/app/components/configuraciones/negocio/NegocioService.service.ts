import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Negocio } from "../../model/Negocio.model";

@Injectable()
export class NegocioService {

  lstEmpresas: Negocio[] = [];
  uriapi: string = environment.UrlTransactional;
  value: any;
  constructor(private httpClient: HttpClient) {

  }

  listarEmpresas() {

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio';
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  buscarnegocioporid(id: number) {
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio/buscarid/' + id;
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  guardarEmpresa(id: number, empresa: Negocio){

    const body = {
      idnegocio: Number(id),
      codnegocio: empresa.codnegocio,
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      email: empresa.email,
      telefonomovil: empresa.telefonomovil,
      web: empresa.web,
      imagen: '',
      mascaracontable: '',
      contribuyente: 'No',
      habilitado: empresa.habilitado,
      cantidadusuario: empresa.cantidadusuario,
      tiempocierresesion: empresa.tiempocierresesion,
      dominio: '',
	    ip: '',
	    puerto: '',
      creadoel: new Date(),
      actualizadoel: null
    };


    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarNegocio(id: number) {
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio/' + id;
    return this.httpClient.delete(endpoint, { headers: httpHeaders });
  }

  mostrar(id: number){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio/buscarid/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

}
