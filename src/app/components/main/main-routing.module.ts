import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes =
[
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'portafolio',
        loadChildren: () => import('../../components/portafolio/portafolio.module').then(y => y.PortafolioModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('../../components/ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        path: 'inventarios',
        loadChildren: () => import('../../components/inventarios/inventarios.module').then(x => x.InventariosModule)
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('../../components/configuraciones/configuraciones.module').then(p => p.ConfiguracionesModule)
      },
      {
        path: 'compras',
        loadChildren: () => import('../../components/compras/compras.module').then(z => z.ComprasModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../../components/ajustes/ajustes.module').then(z => z.AjustesModule)
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
