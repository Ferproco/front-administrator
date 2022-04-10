import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { JwtUser } from "../../model/JwtUser.model";
import { Negocio } from "../../model/Negocio.model";
import { Session } from "../../model/Session.model";

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): JwtUser {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  getCurrentPais(): number {
    var session: Session = this.getCurrentSession();
    return (session && session.codpais) ? session.codpais : null;
  };

  getCurrentEmpresa(): Negocio {
    var session: Session = this.getCurrentSession();
    return (session && session.empresa) ? session.empresa : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}