import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/components/model/Categoria.model';
import { CategoriaService } from '../CategoriaService.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  id = 0;

  loading = false;
  formcategoria: FormGroup;
  idnegocio: number;
  CategoriaModel: Categoria;
  acciondeltitulo: string = 'Crear';
  Objetoestado: string = 'Activo';
  objetoimagen: string = 'fa fa-plus-square-o';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  customClass = 'customClass';
  isFirstOpen = true;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private categoriaService: CategoriaService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

    this.CategoriaModel = new Categoria();
    this.idnegocio = 1;

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      this.acciondeltitulo = 'Modificar';
      this.objetoimagen = 'fa fa-edit';
      // this.buscarArticulo(this.id);
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.buscarCategoria(this.id);
  }

  guardarCategoria(event: Event) {
    event.preventDefault();
    const controls = this.formcategoria.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formcategoria.valid) {
      this.loading = true;
      const value = this.formcategoria.value;
      this.categoriaService.guardarCategoria(this.id, this.idnegocio, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/portafolio/listarcategorias']);
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


  private buildForm() {
    this.formcategoria = this.formbuilder.group({
      nomfamilia: [this.CategoriaModel.nomfamilia, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      status: [this.CategoriaModel.status === 'Activo' ? 1 : 0, [Validators.required]]

    });
    this.Objetoestado = this.formcategoria.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  buscarCategoria(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.categoriaService.mostrarCategoria(id)
      .subscribe(response => {
        this.CategoriaModel = response as any;
        if (this.CategoriaModel.status === 'Activo') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.buildForm();
        this.loading = false;
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

  get nomfamilia() {
    return this.formcategoria.get('nomfamilia');
  }
  onChange(event: MatSlideToggleChange) {

    this.formcategoria.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formcategoria.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }



}
