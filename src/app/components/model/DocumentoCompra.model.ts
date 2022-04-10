import { FormaPago } from './FormaPago.model';
import { Vendedor } from './Vendedor.model';
import { Contacto } from './Contacto.model';
import { DetallesDocumentoCompra } from './DetallesDocumentoCompra.model';

export class DocumentoCompra {

  public documentoid: number = 0;
  public numerodocumento: string = null;
  public codnegocio: number;
  public codformapago: number = 1;
  public codcontacto: string;
  public codvendedor: number = 1;
  public fechaemision: Date = new Date();
  public fechavencimiento: Date = new Date();
  public fecha: Date = new Date();
  public referencia: string;
  public status: string = 'ACTIVO';
  public baseimp: number = 0;
  public isrl: number = 0;
  public observacion: string = '';
  public numcontrol: string = '';
  public numretencion: number = 0;
  public pctiva_a: number = 0;
  public pctiva_b: number = 0;
  public descuento: number = 0;
  public subtotal: number = 0;
  public total: number = 0;
  public montoretenido: number = 0;
  public status_cobro: string = '';
  public tipodocumento: string = '';
  public contable: string = '';
  public numeroz: string = '';
  public status_impresion: string = '';
  public codruta: string = '';
  public contacto: Contacto;
  public vendedor: Vendedor;
  public formapago: FormaPago;
  public lstdetallesdocumentocompras: DetallesDocumentoCompra[]=[];

  constructor(json: any = null) {
    if (json !== null) {
      this.documentoid = json.documentoid;
      this.numerodocumento = json.numerodocumento;
      this.codnegocio = json.codnegocio;
      this.codformapago = json.codformapago;
      this.codcontacto = json.codcontacto;
      this.codvendedor = json.codvendedor;
      this.fechaemision = json.fechaemision;
      this.fechavencimiento = json.fechavencimiento;
      this.fecha = json.fecha;
      this.referencia = json.referencia;
      this.status = json.status;
      this.baseimp = json.baseimp;
      this.isrl = json.isrl;
      this.observacion = json.observacion;
      this.numcontrol = json.numcontrol;
      this.numretencion = json.numretencion;
      this.pctiva_a = json.pctiva_a;
      this.pctiva_b = json.pctiva_b;
      this.descuento = json.descuento;
      this.subtotal = json.subtotal;
      this.total = json.total;
      this.montoretenido = json.montoretenido;
      this.status_cobro = json.status_cobro;
      this.tipodocumento = json.tipodocumento;
      this.contable = json.contable;
      this.numeroz = json.numeroz;
      this.status_impresion = json.status_impresion;
      this.codruta = json.codruta;
    }
  }
}
