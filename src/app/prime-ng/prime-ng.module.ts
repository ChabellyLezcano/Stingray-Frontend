import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    PasswordModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    MenubarModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    MenuModule,
    ToastModule,
    BreadcrumbModule,
    CardModule,
    TableModule,
    FileUploadModule
  ],
})
export class PrimeNgModule {}
