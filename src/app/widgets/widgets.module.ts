import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { FilePickerComponent } from './file-picker/file-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    LoaderComponent,
    FilePickerComponent
  ],
  exports: [
    LoaderComponent,
    FilePickerComponent
  ]
})
export class WidgetsModule {
}