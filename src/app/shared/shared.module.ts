import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeadbarComponent } from './headbar/headbar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    SidebarComponent,
    HeadbarComponent
  ],
  imports: [
    CommonModule, 
    PrimeNgModule
  ],
  exports: [
    SidebarComponent,
    HeadbarComponent
  ]
})
export class SharedModule { }
