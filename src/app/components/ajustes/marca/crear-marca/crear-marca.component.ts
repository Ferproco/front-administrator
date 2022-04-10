import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from '../MarcaService.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit {
  id = 0;

  loading = false;
  formmarca: FormGroup;
  idnegocio: number;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private marcaService: MarcaService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {

    this.buildForm();
    this.idnegocio = 1;
  }

  ngOnInit(): void {
  }
  guardarMarca(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formmarca.value;
    this.marcaService.guardarMarca(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['/main/dashboard/portafolio/listarmarcas']);
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          console.log('Error ' + error);
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }));
  }


  private buildForm() {
    this.formmarca = this.formbuilder.group({
      nommarca: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      status: ['1', [Validators.required]]

    });
  }

  get nommarca() {
    return this.formmarca.get('nommarca');
  }

}
