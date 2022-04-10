export class ListaPrecio{
	id:number;
	numerolista:string;
    vigentedesde:string;
    tarifa:string;
    fechasistem:string;
    status:string;
    vigente:string;
    codnegocio:number;
    codmoneda:string;
    simbolo:string;
    constructor(id:number,numerolista:string,vigentedesde:string,tarifa:string,fechasistem:string,
        status:string, vigente:string,codnegocio:number,codmoneda:string,simbolo:string){

            this.id=id;
            this.numerolista=numerolista;
            this.vigentedesde=vigentedesde;
            this.tarifa=tarifa;
            this.fechasistem=fechasistem;
            this.status=status;
            this.vigente=vigente;
            this.codnegocio=codnegocio;
            this.codmoneda=codmoneda;
            this.simbolo=simbolo;
    }
}