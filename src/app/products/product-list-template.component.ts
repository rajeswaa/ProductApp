import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sortedData: IProduct[];
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  constructor(private productService: ProductService) {
    this.sortedData = this.products.slice();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  sortData(sort: Sort) {
    const data = this.filteredProducts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.filteredProducts = data.sort((a, b) => {      
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'productName': return compare(a.productName, b.productName, isAsc);
        case 'productCode': return compare(a.productCode, b.productCode, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'releaseDate': return compare(a.releaseDate, b.releaseDate, isAsc);
        case 'starRating': return compare(a.starRating, b.starRating, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
