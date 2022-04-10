export class Departamento{

   	 id:number;	
	 codigo:string;	
	 nombre:string;
	 status:string;	
     codpais:number;
     
    constructor( id:number,codigo:string,nombre:string, status:string,codpais:number){
       this.id= id;	
       this.codigo= codigo;	
       this.nombre=nombre;
       this.status=status;	
       this.codpais=codpais;

    }
}