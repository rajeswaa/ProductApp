import {Component,OnInit, ViewChild} from "@angular/core";
import { MatSort,MatSortable, MatTableDataSource,MatPaginator } from '@angular/material'

import { IProduct } from "./product";
import { ProductService } from "src/app/products/product.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ['./product-list.component.css'],
})
export class ProductComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pageTitle: string = "Products List - " + environment.userName;
    showImage:boolean = true;
    imageWidth: number = 30;
    imageMargin: number = 10;
    filteredProduct: IProduct[];
    datasource:any;
    products: IProduct[];    
    _listItem: string = '';
    error: string;
    displayColumns: string[] = ['imageUrl','productName','productCode','releaseDate','description','price','starRating','id'];
    public pageSize: number = 5;
    public currentPage: number = 0;
    public totalSize: number = 0;

    get listItem(): string {
        return this._listItem;
    } 
    set listItem(value:string) {
        this._listItem = value;
        this.filteredProduct = this.listItem ? this.performFilter(this.listItem) : this.products;
        this.datasource = new MatTableDataSource(this.filteredProduct);
        this.datasource.sort= this.sort;
        this.datasource.paginator = this.paginator;  
    }
   
    constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.showImage = this.route.snapshot.queryParams['showImage'] === "true";        
        
        this.productService.getProducts().subscribe(
            (product) => {
                this.products = product;
                this.listItem = this.route.snapshot.queryParams['filteredBy'] || '';
                this.filteredProduct = this.listItem === '' ? this.products : this.performFilter(this.listItem);
                this.datasource = new MatTableDataSource(this.filteredProduct);
                this.datasource.sort= this.sort;
                this.datasource.paginator = this.paginator;        
             },
            (error) => {
                this.error = <any>error
                console.log(this.error);
            }
        );
    }

    toggleImage():void {
        this.showImage = !this.showImage;
    }    

    performFilter(filterItem: string) : IProduct[] {
        return this.products.filter((p) => p.productName.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = "Products List" + message;
    }

    onRowClicked(row):void {
        console.log(row.productName);
    }
}