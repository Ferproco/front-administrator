import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoDocumentosComprasComponent } from './catalogo-documentos-compras/catalogo-documentos-compras.component';

import { ComprasComponent } from './compras.component';
import { DocumentosComprasComponent } from './documentos-compras/documentos-compras.component';

const routes: Routes = [
  { path: '', component: ComprasComponent,

  children: [
    {
      path: 'catalogodocumentodecompra-factura/:tipodocumento',
      component: CatalogoDocumentosComprasComponent
    },
    {
      path: 'documentodecompra-factura/:tipodocumento',
      component: DocumentosComprasComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
