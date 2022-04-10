import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from 'src/app/components/auth/validator';
import { Usuario } from 'src/app/components/model/Usuario.model';
import { UsuarioService } from '../UsuarioService.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  formusuario: FormGroup;
  UsuarioModel: Usuario;
  loading = false;
  camposrequeridos: string;
  idusuario = 0;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private formbuilder: FormBuilder,
              private usuarioService: UsuarioService) {

    this.UsuarioModel = new Usuario();
    if (this.route.snapshot.params.id) {
      this.idusuario = this.route.snapshot.params.id;
    }
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.formusuario = this.formbuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      nombrecompleto: ['', [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      ocupacion: [],
      telefono: [],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)]],
      repetirpassword: [''],
      creadoel: [new Date()],
      actualizadoel: [new Date()],
      activo: [true, [Validators.required]]

    }, {
      validator: ConfirmedValidator('password', 'repetirpassword')
    });
  }

  get email() {
    return this.formusuario.get('email');
  }

  get telefono() {
    return this.formusuario.get('telefono');
  }

  get ocupacion() {
    return this.formusuario.get('ocupacion');
  }

  get password() {
    return this.formusuario.get('password');
  }

  get repetirpassword() {
    return this.formusuario.get('repetirpassword');
  }

  get nombrecompleto() {
    return this.formusuario.get('nombrecompleto');
  }

  get activo() {
    return this.formusuario.get('activo');
  }

  onChange(event: MatSlideToggleChange) {
    this.formusuario.get('activo').setValue(event.checked === true ? true : false);
  }

  cargarRequeridos(e) {

    let i = 0;
    let valido = false;
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formusuario.controls).forEach(key => {

      if (this.formusuario.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

  guardarUsuario(event: Event) {
    event.preventDefault();
    const controls = this.formusuario.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formusuario.valid) {
      this.loading = true;
      const value = this.formusuario.value;
      this.usuarioService.guardarUsuario(this.idusuario, value)
        .subscribe(response => {

          this.usuarioService.enviarEmailcrearUsuario(value.email, value.nombrecompleto, value.password).subscribe(response => {

          });

          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/configuraciones/listarusuarios']);
        },
          ((error: HttpErrorResponse) => {
            this.loading = false;
            if (error.status === 404) {

            }
            else {
              this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
                { enableHtml: true, closeButton: true });
            }
          }));
    }
    else {
      this.toastr.error('Opss faltan datos que son obligatorios ', 'Error',
        { enableHtml: true, closeButton: true });
    }
  }

}
