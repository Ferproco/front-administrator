import { JwtUser } from "./JwtUser.model";
import { Negocio } from "./Negocio.model";


export class Session {
  public token: string;
  public user: JwtUser;
  public empresa: Negocio;
  codpais: number;

  constructor(tokenIn: string, userin: JwtUser, negocio: Negocio, codpais: number) {
    this.token   = tokenIn;
    this.user    = userin;
    this.empresa = negocio;
    this.codpais = codpais
  }

}