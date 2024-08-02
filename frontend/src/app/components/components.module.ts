import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTemplateComponent } from './table-template/table-template.component';
import { PagingComponent } from './paging/paging.component';
import { MeterialModule } from '../meterial/meterial.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    TableTemplateComponent,
    PagingComponent,
    ImageUploadComponent,
    PageNotFoundComponent
    
    
  ],
  imports: [
    CommonModule,
    MeterialModule
    
  ]
  ,
  exports:[
    TableTemplateComponent,
    ImageUploadComponent,
    PagingComponent
  ]
})
export class ComponentsModule { }
