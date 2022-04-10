import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NegocioService } from '../../configuraciones/negocio/NegocioService.service';
import { Login } from '../../model/Login.model';
import { Negocio } from '../../model/Negocio.model';
import { Session } from '../../model/Session.model';
import { LoginService } from './LoginService.service';
import { StorageService } from './StorageService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formuser: FormGroup;
  LoginModel: Login;
  loading = false;
  constructor(private router: Router,
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private negocioService: NegocioService,
    private storageService: StorageService,
    private toastr: ToastrService) {

    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.formuser = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern('^([^\\s]|\\s[^\\s])+$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]]

    });
  }

  login(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formuser.value;
    this.loginService.login(value.username, value.password).subscribe(response => {  
      let sesion = response as Session;      
      this.negocioService.buscarnegocioporid(sesion.user?.empresaid).subscribe(responseempresa => {     
        let empresa = responseempresa as Negocio;
        sesion.empresa = empresa;
        sesion.codpais = empresa.codpais;
        console.log(JSON.stringify(sesion));
        this.storageService.setCurrentSession(sesion);
        this.router.navigate(['main/dashboard']);
        this.loading = false;
      });


    },
      ((error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 404) {
          this.toastr.info('Usuario o Contraseña incorrectos ', 'Información',
            { enableHtml: true, closeButton: true });
        }
        else
          if (error.status === 401) {
            this.toastr.error('Usuario no Autorizado ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
      }));

  }

  get username() {
    return this.formuser.get('username');
  }

}
