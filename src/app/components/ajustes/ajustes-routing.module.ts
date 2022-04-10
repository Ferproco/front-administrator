import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesComponent } from './ajustes.component';
import { CatalogoFormapagoComponent } from './formapago/catalogo-formapago/catalogo-formapago.component';
import { CrearFormapagoComponent } from './formapago/crear-formapago/crear-formapago.component';
import { CatalogoMarcaComponent } from './marca/catalogo-marca/catalogo-marca.component';
import { CrearMarcaComponent } from './marca/crear-marca/crear-marca.component';
import { CatalogoUnidadmedidaComponent } from './unidad/catalogo-unidadmedida/catalogo-unidadmedida.component';


const routes: Routes =
  [
    {
      path: '', component: AjustesComponent,
      children: [
        {
      path: 'listarformaspagos',
      component: CatalogoFormapagoComponent
    },
    {
      path: 'crearformapagos',
      component: CrearFormapagoComponent
    },

    {
      path: 'crearformapagos/:id',
      component: CrearFormapagoComponent
    },
    {
      path: 'listarunidades',
      component: CatalogoUnidadmedidaComponent
    },
    {
      path: 'crearmarca',
      component: CrearMarcaComponent
    },
    {
      path: 'listarmarcas',
      component: CatalogoMarcaComponent
    },
     {
       path: 'crearunidadmedida',
       //component: CrearUnidadMedidaComponent
      },

      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
