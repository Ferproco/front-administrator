export class UnidadMedida {
    id:number;
    abrevunidadmedida: string;
    nomunidadmedida: string;
    codnegocio:number;
    status:string;

    constructor(id:number,abrevunidadmedida: string, nomunidadmedida: string, codnegocio: number,status:string ) {
        
        this.id=id;
        this.abrevunidadmedida = abrevunidadmedida;
        this.nomunidadmedida = nomunidadmedida;
        this.codnegocio=codnegocio;
        this.status=status;

    }
}