import { NgModule } from '@angular/core';

import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AppProductRoutingModule } from './app-product-routing.module';
import { ProductEditComponent } from './product-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryProductService } from '../shared/in-memory-product.service';
import { ProductComponent } from './product-list.component';

@NgModule({
  imports: [
    SharedModule,
    AppProductRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryProductService)
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})

export class ProductModule { }
