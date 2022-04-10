import { Articulo } from "./Articulo.model";
import { Contacto } from "./Contacto.model";

export class Kardex{

    public id: number = 0;
    //public documento_id: number = 0;
    public articulo_id: number;
    public tipo: string;
    public fecha: Date;
    public documentoasociado: string;
    public cantidad: number;
    public entrada: number;
    public salida: number;
    public montoxunidad: number = 0;
    public codunidadmedida: number = 0;
    public codunidadalterna: number = 0;
    public cantidadalterna:number = 0;
    public montoxunidadalterna:number = 0;
    public montototal:number = 0;
    public codalmacen:number;
    public concepto:string;
    public origen:string;
    public codnegocio:number;
    public numerocontrol:number;
    public status:string='ACTIVO';
    public codcontacto:number=0;
    public contacto: Contacto;

   // public articulo: Articulo;

    constructor(json: any = null){
        if (json !== null) {
        this.id = json.id;
        //this.documento_id = json.documento_id;
        this.articulo_id = json.articulo_id;
        this.tipo = json.tipo;
        this.fecha = json.fecha;
        this.documentoasociado = json.documentoasociado;
        this.cantidad = json.cantidad;
        this.montoxunidad = json.montoxunidad;
        this.codunidadmedida = json.codunidadmedida;
        this.codunidadalterna = json.codunidadalterna;
        this.cantidadalterna = json.cantidadalterna;
        this.montoxunidadalterna = json.montoxunidadalterna;
        this.montototal = json.montototal;
        this.codalmacen = json.codalmacen;
        this.concepto = json.concepto;
        this.origen = json.origen;
        this.codnegocio = json.codnegocio;
        this.numerocontrol = json.numerocontrol;
        this.status=json.status;
        this.codcontacto=json.codcontacto;
        this.contacto = json.contacto;
       // this.articulo=json.Item
        }

    }
}
