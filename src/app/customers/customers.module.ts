import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { RcustomersComponent } from './rcustomers.component';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CustomersComponent,
    RcustomersComponent,
    SignupComponent
  ]
})
export class CustomersModule { 
  
}
