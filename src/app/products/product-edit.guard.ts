import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent, 
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(component.productForm.dirty)
      {
        const productName = component.productForm.get('productName').value || 'New Product';
        return confirm(`Do you want to navigate away and lose all the changes to ${productName}?`);
      }
    return true;
  }
}
