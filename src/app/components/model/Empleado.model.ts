export class Empleado {
    public id: number;
    public codtipoempleado: number;
    public codtipoidentificacion: number = null;
    public numeroidentificacion: string = '';
    public codigodv: number;
    public nombreprimero: string='';
    public nombresegundo: string='';
    public apellidoprimero: string='';
    public apellidosegundo: string='';
    public telefonomovil:string='';
    public telefonofijo1: string='';
    public telefonofijo2: string='';
    public telefonofax: string='';
    public codpais: number = null;
    public coddepartamento: number = null;
    public codmunicipio: number = null;
    public direccionfiscal: string='';
    public correoe: string='';
    public status: string = 'Activo';
    public fecharegistro: Date;

    constructor(json: any = null) {
        if (json !== null) {
            this.id = json.id;
            this.codtipoempleado = json.codtipoempleado;
            this.codtipoidentificacion = json.codtipoidentificacion;
            this.numeroidentificacion = json.numeroidentificacion;
            this.codigodv = json.codigodv;
            this.nombreprimero = json.nombreprimero;
            this.nombresegundo = json.nombresegundo;
            this.apellidoprimero = json.apellidoprimero;
            this.apellidosegundo = json.apellidosegundo;
            this.telefonomovil=json.telefonomovil;
            this.telefonofijo1 = json.telefonofijo1;
            this.telefonofijo2 = json.telefonofijo2;
            this.telefonofax = json.telefonofax;
            this.codpais = json.codpais;
            this.coddepartamento = json.coddepartamento;
            this.codmunicipio = json.codmunicipio;
            this.direccionfiscal = json.direccionfiscal;
            this.correoe = json.correoe;
            this.status = json.status;
            this.fecharegistro = json.fecharegistro;

        }


    }
}