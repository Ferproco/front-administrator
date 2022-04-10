import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contacto } from '../../model/Contacto.model';
import { Empleado } from '../../model/Empleado.model';



@Injectable()
export class EmpleadoService {

    lstEmpleados: Empleado[] = [];
    uriapi: string = environment.UrlTransactional;

    constructor(private httpClient: HttpClient) {

    }

    mostrarEmpleados(id: number) {

        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/empleado/' + id;
        return this.httpClient.get(endpoint, { headers: httpHeaders });
    }

    listarEmpleados(codnegocio: string) {
        const body = {

        };
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/empleado';
        return this.httpClient.get(endpoint, { headers: httpHeaders });
    }

    listarEmpleadosPorTipo(codnegocio: string, tipo: string) {
        let tipoempleado = 0;
        if (tipo === 'V') {
            tipoempleado = 1;
        }
        else if (tipo === '') {
            tipoempleado = 2;
        }
        else if (tipo === 'T') {
            tipoempleado = 3;
        }
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/empleado/tipo/' + tipoempleado;
        return this.httpClient.get(endpoint, { headers: httpHeaders });
    }

    guardarEmpleado(idIn: number, idnegocio: number, empleado: Empleado) {
        const body = {
            id: Number(idIn),
            codtipoidentificacion: Number(empleado.codtipoidentificacion),
            codnegocio: Number(idnegocio),
            numeroidentificacion: empleado.numeroidentificacion,
            nombreprimero: empleado.nombreprimero,
            nombresegundo: empleado.nombresegundo,
            apellidoprimero: empleado.apellidoprimero,
            apellidosegundo: empleado.apellidosegundo,
            telefonomovil: empleado.telefonomovil,
            telefonofijo1: empleado.telefonofijo1,
            telefonofijo2: empleado.telefonofijo2,
            telefonofax: empleado.telefonofax,
            direccionfiscal: empleado.direccionfiscal,
            correoe: empleado.correoe,
            fecharegistro: new Date(empleado.fecharegistro),
            codtipoempleado: Number(empleado.codtipoempleado),
            codpais: Number(empleado.codpais),
            coddepartamento: Number(empleado.coddepartamento),
            codmunicipio: Number(empleado.codmunicipio),
            codigodv: empleado.codigodv,
            status: Number(empleado.status) === 1 ? 'Activo' : 'Inactivo'

        };
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/empleado';
        return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });
    }

    eliminarEmpleado(id: number) {
        const body = {
            id: Number(id)
        };
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/empleado/' + id;
        return this.httpClient.delete(endpoint, { headers: httpHeaders });
    }
}
