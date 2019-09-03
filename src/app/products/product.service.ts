import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from 'rxjs'
import { tap, catchError, retry, map } from 'rxjs/operators'

import { IProduct } from 'src/app/products/product'

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    apiUrl: string = 'api/products'

    constructor(private http: HttpClient) {}

    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.apiUrl).pipe(
            retry(3),
            tap((message) => console.log('All:' + JSON.stringify(message))),
            catchError(this.handleError)
        );
    }

    getProduct(id:number) : Observable<IProduct> {
        if(id === 0)
            return of(this.initialProduct());
        
        const url = `${this.apiUrl}/${id.toString()}`;

        return this.http.get<IProduct>(url).pipe(
            retry(3),
            tap((message) => console.log('All:' + JSON.stringify(message))),
            catchError(this.handleError)
        );
    }

    createProduct(product: IProduct):Observable<IProduct> {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        product.id = null;

        return this.http.post<IProduct>(this.apiUrl,product,{headers: headers}).pipe(
            tap((message) => console.log('create product: ' + JSON.stringify(message))),
            catchError(this.handleError)
        )
    }

    updateProduct(product:IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const baseUrl = `${this.apiUrl}/${product.id}`;

        return this.http.put<IProduct>(baseUrl,product,{headers: headers}).pipe(
            tap(() => console.log('update product: ' + JSON.stringify(product))),
            map(() => product),
            catchError(this.handleError)
        );
    }

    initialProduct(): IProduct {
        return {
            id:0,
            description: null,
            imageUrl: null,
            price: null,
            productCode: null,
            productName: null,
            releaseDate: null,
            starRating: null,
            tags: []
        }
    }

    handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if(err.error instanceof ErrorEvent ){
            errorMessage = `An error occured: ${err.error.message}`;
        }
        else {
            errorMessage = `Server error occured: ${err.message}`;
        }
        return throwError(errorMessage);
    }
}