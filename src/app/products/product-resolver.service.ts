import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { ProductService } from "./product.service";
import { IProduct } from "./product";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class ProductResolver implements Resolve<IProduct>
{
    constructor(private productService: ProductService, private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let productId = route.params['id'];

        if(isNaN(+productId)){
            console.log(`Product Id ${productId} is not valid`);
            this.router.navigate(['/products']);
            return of(null);
        }

        return this.productService.getProduct(+productId).pipe(
            map(product => {
                if(product) {
                    return product;
                }
                else {
                    console.log(`Product not found: ${productId}`);
                    this.router.navigate(['/products']);
                    return null;
                }
            })            
        )
    }
}