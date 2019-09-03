import { Pipe, PipeTransform } from "@angular/core";
import { IProduct } from "src/app/products/product";

@Pipe({
    name:'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
    transform(products: IProduct[], filter: string): IProduct[]{
        if(!products) 
            return [];
        if(!filter)
            return products;

        return products.filter((p)=>p.productName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}