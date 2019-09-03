import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarComponent } from './star/star.component';
import { ConvertToSpacesPipe } from './Pipes/convert-to-spaces.pipe';
import { HighlightDirective } from './Directives/highlight.directive';
import { FilterProductsPipe } from './Pipes/filter-products.pipe';
import { MatSortModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatSortModule, 
    MatPaginatorModule, 
    MatTableModule,
    BrowserAnimationsModule
  ],
  declarations: [    
    StarComponent,
    HighlightDirective,
    ConvertToSpacesPipe,
    FilterProductsPipe
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarComponent,
    HighlightDirective,
    ConvertToSpacesPipe,
    FilterProductsPipe,
    MatSortModule, 
    MatPaginatorModule, 
    MatTableModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }