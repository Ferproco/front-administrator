import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/login/StorageService.service';
import { Categoria } from '../../model/Categoria.model';
import { Negocio } from '../../model/Negocio.model';



@Injectable()
export class CategoriaService{

  lstCategorias: Categoria[] = [];
  uriapi: string = environment.UrlTransactional;
  public empresa: Negocio;

  constructor(private httpClient: HttpClient,
              private storageService: StorageService) {

    this.empresa = this.storageService.getCurrentEmpresa();
}

  listarCategorias(){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarCategoria(id: number, idnegocio: number, categoria: Categoria){

    const body = {
      codfamilia: Number(id),
      nomfamilia: categoria.nomfamilia,

      status: Number(categoria.status) === 1 ? 'Activo' : 'Inactivo',
      codnegocio: idnegocio,

    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarCategoria(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarCategoria(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

}
