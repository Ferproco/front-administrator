export class Vendedor {
    public id:number;
    public codigo: string;
    public nombre: string;
    public porcfclimp: number;
    public porclclimp: number;
    public porcfclexp: number;
    public interno: string;
    public cobrador: string;
    public direccionfiscal: string;
    public correoe: string;
    public codnegocio: number;
    public codzona: number;
    public codusuario: string;
    public montometa: number;
    public status: string;

    constructor(json: any = null) {
        this.id=json.id;
        this.codigo =json.codigo;
        this.nombre = json.nombre;
        this.porcfclimp = json.porcfclimp;
        this.porclclimp =json. porclclimp;
        this.porcfclexp = json.porcfclexp;
        this.interno = json.interno;
        this.cobrador = json.cobrador;
        this.direccionfiscal =json. direccionfiscal;
        this.correoe = json.correoe;
        this.codnegocio = json.codnegocio;
        this.codzona = json.codzona;
        this.codusuario = json.codusuario;
        this.montometa = json.montometa;
        this.status = json.status;
    }
}