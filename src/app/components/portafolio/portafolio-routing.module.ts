import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortafolioComponent } from './portafolio.component';
import { CatalogoAlmacenComponent } from './almacen/catalogo-almacen/catalogo-almacen.component';
import { CrearAlmacenComponent } from './almacen/crear-almacen/crear-almacen.component';
import { CatalogoArticuloComponent } from './articulo/catalogo-articulo/catalogo-articulo.component';
import { CrearArticuloComponent } from './articulo/crear-articulo/crear-articulo.component';
import { CatalogoCategoriaComponent } from './categoria/catalogo-categoria/catalogo-categoria.component';
import { CrearCategoriaComponent } from './categoria/crear-categoria/crear-categoria.component';
import { CrearContactoComponent } from './contacto/crear-contacto/crear-contacto.component';
import { CatalogoVendedorComponent } from './vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { CrearVendedorComponent } from './vendedor/crear-vendedor/crear-vendedor.component';
import { CatalogoContactosComponent } from './contacto/catalogo-contactos/catalogo-contactos.component';
import { CatalogoEmpleadoComponent } from './empleado/catalogo-empleado/catalogo-empleado.component';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';

const routes: Routes =
  [
    {
      path: '', component: PortafolioComponent,
      children: [
        {
          path: 'listararticulos',
          component: CatalogoArticuloComponent
        },
        {
          path: 'creararticulo',
          component: CrearArticuloComponent
        },
        {
          path: 'creararticulo/:id',
          component: CrearArticuloComponent
        },
        {
          path: 'listaralmacenes',
          component: CatalogoAlmacenComponent
        },
        {
          path: 'crearalmacen',
          component: CrearAlmacenComponent
        },
        {
          path: 'crearalmacen/:id',
          component: CrearAlmacenComponent
        },
        {
          path: 'listarcategorias',
          component: CatalogoCategoriaComponent
        },
        {
          path: 'crearcategoria',
          component: CrearCategoriaComponent
        },
        {
          path: 'crearcategoria/:id',
          component: CrearCategoriaComponent
        },

        {
          path: 'listarvendedores',
          component: CatalogoVendedorComponent
        },
        {
          path: 'crearvendedores',
          component: CrearVendedorComponent
        },
        {
          path: 'listarcontactos',
          component: CatalogoContactosComponent
        },
        {
          path: 'crearcontacto',
          component: CrearContactoComponent
        },
        {
          path: 'crearcontacto/:id',
          component: CrearContactoComponent
        },
        {
          path: 'listarempleados',
          component: CatalogoEmpleadoComponent
        },
        {
          path: 'crearempleado',
          component: CrearEmpleadoComponent
        },
        {
          path: 'crearempleado/:id',
          component: CrearEmpleadoComponent
        },

      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortafolioRoutingModule { }
