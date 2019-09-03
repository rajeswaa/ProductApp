import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service'
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  errorMessage: string;
  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private router: Router) { }

  onBack(): void {
    this.router.navigate(['/products'],{queryParamsHandling:"preserve"});
  }

  onEdit(): void{
    this.router.navigate(['/products',this.product.id,'edit']);
  }

  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
      },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      }
    );
    console.log(`Product Id: $(this.product.Id)`);
  }
}