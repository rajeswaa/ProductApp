import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ProductListGuard } from './product-list.guard';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditGuard } from './product-edit.guard';
import { ProductComponent } from './product-list.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path:'products', component: ProductComponent },
      { path:'products/:id',canActivate:[ProductListGuard], component: ProductDetailComponent },
      { path:'products/:id/edit',canDeactivate: [ProductEditGuard], component: ProductEditComponent },
    ])
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppProductRoutingModule { }
