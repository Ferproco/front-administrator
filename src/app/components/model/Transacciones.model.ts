export class Transacciones{

    numerotransaccion:number;
    codigoarticulo:string;
    tipo:string;
    fecha:string;
    documentoasociado:string;
    cantidad:number;
    monto:number;
    almacen:string;
    unidadmedida:string;
    concepto:string;
    origen:string;
    codnegocio:string;
    unidadmedidaalterna:string;
    codigocontable:string;
    cantidadalterna:number;
    montoprecio:number;
    nombrealmacen:string;
    nombrearticulo:string;
    nombreunidadmedida:string;
    nombreunidadmedidaalterna:string;
    codigofamilia:number;
    nombrefamilia:string;
    codigogrupoarticulo:string;
    nombregrupoarticulo:string;
    codigomarca:number;
    nombremarca:string;
    costounitario:number;
    numerocontrol:string;
    constructor(numerotransaccion:number,codigoarticulo:string, tipo:string,fecha:string, documentoasociado:string,cantidad:number, monto:number,almacen:string,unidadmedida:string,concepto:string,origen:string,codnegocio:string,unidadmedidaalterna:string,codigocontable:string, cantidadalterna:number,
        montoprecio:number,nombrealmacen:string,nombrearticulo:string, nombreunidadmedida:string,nombreunidadmedidaalterna:string,codigofamilia:number,nombrefamilia:string,codigogrupoarticulo:string,
        nombregrupoarticulo:string, codigomarca:number,nombremarca:string,costounitario:number, numerocontrol:string){


        this.numerotransaccion=numerotransaccion;
        this.codigoarticulo=codigoarticulo;
        this.tipo=tipo;
        this.fecha=fecha;
        this.documentoasociado=documentoasociado;
        this.cantidad=cantidad;
        this.monto=monto;
        this.almacen=almacen;
        this.unidadmedida=unidadmedida;
        this.concepto=concepto;
        this.origen=origen;
        this.codnegocio=codnegocio;
        this.unidadmedidaalterna=unidadmedidaalterna;
        this.codigocontable=codigocontable;
        this.cantidadalterna=cantidadalterna;
        this.montoprecio=montoprecio;
        this.nombrealmacen=nombrealmacen;
        this.nombrearticulo=nombrearticulo;
        this.nombreunidadmedida=nombreunidadmedida;
        this.nombreunidadmedidaalterna=nombreunidadmedidaalterna;
        this.codigofamilia=codigofamilia;
        this.nombrefamilia=nombrefamilia;
        this.codigogrupoarticulo=codigogrupoarticulo;
        this.nombregrupoarticulo=nombregrupoarticulo;
        this.codigomarca=codigomarca;
        this.nombremarca=nombremarca;
        this.costounitario=costounitario;
        this.numerocontrol=numerocontrol;
    }
}