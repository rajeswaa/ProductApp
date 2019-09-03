import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RcustomersComponent } from './rcustomers.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'customers',component:RcustomersComponent}
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppCustomerRoutingModule { }
