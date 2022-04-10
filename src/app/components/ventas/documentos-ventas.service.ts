import { Kardex } from './../model/Kardex.model';
import { DetallesDocumentoVenta } from './../model/DetallesDocumentoVenta.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentoVenta } from '../model/DocumentoVenta.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentosVentasService {

  uriapi: string = environment.UrlTransactional;
  lstdetallesventas: DetallesDocumentoVenta[]=[];
  lstkardex: Kardex[]=[];
  Kardexmodel: Kardex;

  constructor(private httpClient: HttpClient) { }

  listarDocumentosPorTipo(codnegocio: string, tipodocumento: string){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/documentoventa/tipo/' + tipodocumento;
    return this.httpClient.get(endpoint, {headers: httpHeaders});  
  }

  guardarDocumentoVenta(idIn: number, idnegocio: number, documento: DocumentoVenta){
 
    const fechastr = documento.fechaemision.toString().split('-');
    const year = Number(fechastr[2]);
    const month = Number(fechastr[1]) - 1;
    const date = Number(fechastr[0]);

    const fechastrvence = documento.fechavencimiento.toString().split('-');
    const yearvence = Number(fechastrvence[2]);
    const monthvence = Number(fechastrvence[1]) - 1;
    const datevence = Number(fechastrvence[0]);

    documento.lstdetallesdocumentoventas.forEach(element => {
   
     element.fecha= new Date(year, month, date);
     this.Kardexmodel = new Kardex();
     this.Kardexmodel.id = 0;
     this.Kardexmodel.articulo_id = element.codarticulo;
     this.Kardexmodel.codcontacto = Number(documento.codcontacto);
     this.Kardexmodel.tipo = 'SAL';
     this.Kardexmodel.fecha = new Date(year, month, date);
     this.Kardexmodel.documentoasociado = documento.numerodocumento;
     this.Kardexmodel.cantidad = Number(element.cantidad) * (-1);
     this.Kardexmodel.codunidadmedida = Number(element.codunidadmedida);
     this.Kardexmodel.codalmacen = Number(element.codalmacen);
     this.Kardexmodel.concepto = 'SALIDA POR VENTAS';
     this.Kardexmodel.origen = 'VENTAS';
     this.Kardexmodel.codnegocio = element.codnegocio;
     this.Kardexmodel.montoxunidad = element.preciounitariosiniva;
     this.Kardexmodel.montototal = Number(element.cantidad) * Number(element.preciounitariosiniva);

     this.lstkardex.push(this.Kardexmodel);

   });

    const body = {
      documentoid: Number(idIn),
      codnegocio: Number(idnegocio),
      numerodocumento:documento.numerodocumento,
      codformapago: Number(documento.codformapago),
      codcontacto: Number(documento.codcontacto),
      codvendedor:Number(documento.codvendedor),
      fechaemision: new Date(year, month, date),
      fechavencimiento: new Date(yearvence, monthvence, datevence),
      fecha: new Date(),
      referencia:documento.referencia,
      status: Number(documento.status) === 1 ? 'ACTIVO' : 'INACTIVO',
      baseimp:Number(documento.baseimp),
      isrl: Number(documento.isrl),
      observacion: documento.observacion,
      numcontrol: documento.numcontrol,
      numretencion: documento.numretencion,
      pctiva_a: Number(documento.pctiva_a),
      pctiva_b: Number(documento.pctiva_b),
      descuento:Number(documento.descuento),
      subtotal: Number(documento.subtotal),
      total: Number(documento.total),
      montoretenido: Number(documento.montoretenido),
      status_cobro: documento.status_cobro,
      tipodocumento: documento.tipodocumento,
      contable: documento.contable,
      numeroz: documento.numeroz,
      status_impresion:documento.status_impresion,
      codruta: documento.codruta,
      lstdetallesdocumentoventas: documento.lstdetallesdocumentoventas,
      lstmovimientoskardex: this.lstkardex
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/documentoventa';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  cargarReportDcocument(id: number){
    const httpOptions = { 
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf',  responseType : 'blob', Accept : 'application/pdf', observe : 'response' }) };

    const endpoint: any = this.uriapi + 'api/pdfreport/' + id;
    return this.httpClient.get(endpoint, {
      responseType: 'blob'
    });  
  }

}
