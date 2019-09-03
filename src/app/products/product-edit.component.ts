import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common';

import { CustomValidation } from '../customers/custom-validation';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  title: string;
  submitted: boolean = false;
  id: number;
  product: IProduct;
  previousRoute: string;
  errorMessage: any;

  get f() { return this.productForm.controls; } // convenience getter for easy access to form fields
  get tags() { return <FormArray>this.f.tags; } // convenience getter for easy access to form array

  constructor(private fb: FormBuilder, private productService: ProductService, 
              private route:ActivatedRoute, private location:Location, private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      productCode: [null,Validators.required],
      releaseDate: [null],
      description: [null],
      price: [null,Validators.pattern('^[0-9.,]+$')],
      starRating:[null,CustomValidation.ratingRange(1,5)],
      imageUrl: [null],
      tags: this.fb.array([this.buildTags()])
    });

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.productService.getProduct(this.id).subscribe(p=> {
        this.displayProduct(p);
      }),
      (error: any) => this.errorMessage = <any>error
    });
  }

  displayProduct(product: IProduct):void{
    if (this.productForm) {
      this.productForm.reset();      
      while (this.tags.length) {
        this.tags.removeAt(0);
      }
    }
    this.product = product;

    if (this.product.id === 0) {      
      this.title = 'Add Product';
    } else {
      this.title = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
      price:this.product.price,
      releaseDate: this.product.releaseDate
    });

    // this.productForm.setControl('tags',this.fb.array(this.product.tags || []));
    for(let val of this.product.tags)
    {
      this.tags.push(this.buildTags(val));
    }
  }

  buildTags(t?: string): FormGroup{
    return this.fb.group({
      tag: t
    });
  }

  addTags(){
    this.tags.push(this.buildTags());
  }

  onSave():void {
    this.submitted = true;
    
    if(this.productForm.valid) {
      if(this.productForm.dirty){
        const p = { ...this.product, ...this.productForm.value };

        if(p.id === 0) {
          this.productService.createProduct(p).subscribe(
            () => this.onSaveComplete,
            (error) => this.errorMessage = <any>error
          )
        }
        else {
          this,this.productService.updateProduct(p).subscribe(
            ()=> this.onSaveComplete(),
            (error) => this.errorMessage = <any>error
          )
        }
      }
      else {
        this.onSaveComplete();
      }
    }
    return;
  }

  onSaveComplete(): void {
    this.productForm.reset();
    while (this.tags.length) {
      this.tags.removeAt(0);
    }
    this.router.navigate(['/products']);
  }
  onBack():void {
    this.location.back(); 
  }
}