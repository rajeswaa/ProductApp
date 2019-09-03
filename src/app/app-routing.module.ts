import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { RcustomersComponent } from './customers/rcustomers.component';
import { SignupComponent } from './customers/signup.component';
import { ProductEditComponent } from './products/product-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path:'welcome', component:WelcomeComponent },
      { path:'customers', component:RcustomersComponent },
      { path:'signup', component:SignupComponent },
      { path:'products/0/edit', component: ProductEditComponent },
      { path:'', redirectTo:'welcome',pathMatch:'full' },
      { path:'**', redirectTo:'welcome',pathMatch:'full' }
    ])

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
