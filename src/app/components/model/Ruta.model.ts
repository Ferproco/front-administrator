
export class Ruta
{ 
    codigo: string;
    nombre: string;
    codigozona: number;
    desdeuno: string;
    hastauno: string;
    desdedos: string;
    hastados: string;
    codigovendedor:string;
    codnegocio:string;
    status: string;
    
constructor(cod:string,nom:string,codzon:number,desdeuno:string,hastauno:string,desdedos:string, hastados:string, codigoven:string,codnego:string,statu:string){


 this.codigo=cod;
 this.nombre=nom;
 this.codigozona=codzon;
 this.desdeuno=desdeuno;
 this.hastauno=hastauno;
 this.desdedos=desdedos;
 this.hastados=hastados;
 this.codigovendedor=codigoven;
 
}

}