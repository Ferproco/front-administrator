export class PersonaContacto{
    public id:number;
	public nombres:string;
	public apellidos:string;
	public correoelectronico:string;
	public telefono:string;
	public celular:string;
	public status:number;
    public codcontacto:number;

    constuctor(json: any = null){
        if(json !== null) {
          this.id =  json.id;
	      this.nombres = json.nombres;
	      this.apellidos= json.apellidos;
	      this.correoelectronico = json.correoelectronico;
	      this.telefono = json.telefono;
	      this.celular =  json.celular;
	      this.status = json.status;
          this.codcontacto = json.codcontacto;

        }
    }
}