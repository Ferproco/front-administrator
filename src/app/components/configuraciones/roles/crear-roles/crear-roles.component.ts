import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/components/model/Rol.model';
import { RolesService } from '../RolesService.service';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.css']
})
export class CrearRolesComponent implements OnInit {

  formrol: FormGroup;
  RolModel: Rol;
  loading = false;
  camposrequeridos: string;
  idrol = 0;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private rolService: RolesService) {

    this.RolModel = new Rol();
    if (this.route.snapshot.params.id) {
      this.idrol = this.route.snapshot.params.id;
    }
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.formrol = this.formbuilder.group({
      nombre: [this.RolModel.nombre, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      descripcion: [this.RolModel.descripcion, [Validators.required]],
      creadoel: [this.RolModel.creadoel],
      actualizadoel: [this.RolModel.actualizadoel],
      activo: [this.RolModel.activo, [Validators.required]]

    });
  }

  get nombre() {
    return this.formrol.get('nombre');
  }

  get descripcion() {
    return this.formrol.get('descripcion');
  }

  get activo() {
    return this.formrol.get('activo');
  }
  onChange(event: MatSlideToggleChange) {
    this.formrol.get('activo').setValue(event.checked === true ? true : false);
  }

  cargarRequeridos(e) {
    
    let i = 0;
    let valido = false;
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formrol.controls).forEach(key => {

      if (this.formrol.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

  guardarRol(event: Event) {
    event.preventDefault();
    const controls = this.formrol.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formrol.valid) {
      this.loading = true;
      const value = this.formrol.value;
      this.rolService.guardarRol(this.idrol, value).subscribe(response => {

        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['/main/dashboard/configuraciones/listarroles']);
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
