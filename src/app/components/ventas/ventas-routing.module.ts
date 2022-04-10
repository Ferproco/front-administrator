import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { CatalogoDocumentoVentasComponent } from './catalogo-documento-ventas/catalogo-documento-ventas.component';
import { DocumentoVentasComponent } from './documento-ventas/documento-ventas.component';
import { CuentasxcobrarComponent } from './cuentasxcobrar/cuentasxcobrar.component';


const routes: Routes = [
  {
    path: '', component: VentasComponent,
    children: [
      {
        path: 'catalogodocumentodeventa-factura/:tipodocumento',
        component: CatalogoDocumentoVentasComponent
      },
      {
        path: 'documentodeventa-factura/:tipodocumento',
        component: DocumentoVentasComponent
      },
      {
        path: 'catalogodocumentodeventa-cotizacion/:tipodocumento',
        component: CatalogoDocumentoVentasComponent
      },
      {
        path: 'documentodeventa-cotizacion/:tipodocumento',
        component: DocumentoVentasComponent
      },
      {
        path: 'cuentasporcobrar',
        component: CuentasxcobrarComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
