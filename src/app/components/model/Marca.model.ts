export class Marca {
    id: number;
    nommarca: string;
    codnegocio: string;
    status:string;

    constructor(id: number, nommarca: string, codnegocio: string,status:string) {
        this.id = id;
        this.nommarca = nommarca;
        this.codnegocio = codnegocio;
        this.status=status;

    }
    

}