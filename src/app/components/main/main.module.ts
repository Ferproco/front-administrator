import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TableinformationComponent } from './tableinformation/tableinformation.component';


@NgModule({
  declarations:
  [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    TableinformationComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
