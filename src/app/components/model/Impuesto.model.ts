import { TipoImpuesto } from './TipoImpuesto.model';
export class Impuesto {


    public idimpuesto: number;
    public nombreimpuesto: string;
    public idtipoimpuesto: number;
    public normal: number;
    public recargo: number;
    public fechaini: string;
    public fechafin: string;
    public status: string='Activo';
    public codnegocio: string;
    public tipoimpuestos: TipoImpuesto;

    constructor(json: any = null)
     {
      if (json !== null) {
        this.idimpuesto = json.idimpuesto;
        this.nombreimpuesto = json.nombreimpuesto;
        this.idtipoimpuesto = json.idtipoimpuesto;
        this.normal = json.normal;
        this.recargo = json.recargo;
        this.fechaini = json.fechaini;
        this.fechafin = json.fechafin;
        this.status = json.status;
        this.codnegocio = json.codnegocio;
        this.tipoimpuestos = json.tipoimpuestos;
      }
    }
}
