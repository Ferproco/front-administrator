export class TipoIdentificacion {
    id: number;
    codigo: string;
    nombre: string;
    codpais: number;
    requieredigitoveroficador: boolean;

    constructor( id: number, codigo: string,nombre: string, codpais: number, requieredigitoveroficador: boolean) {

        this.id      = id;
        this.codigo  = codigo;
        this.nombre  = nombre;
        this.codpais = codpais;
        this.requieredigitoveroficador = requieredigitoveroficador;
    }
}