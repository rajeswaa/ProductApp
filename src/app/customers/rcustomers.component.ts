import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Customer } from './ICustomer';
import { CustomValidation } from './custom-validation';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './rcustomers.component.html',
  styleUrls: ['./rcustomers.component.css']
})
export class RcustomersComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();
  submitted: boolean = false;

  get addresses() { return <FormArray>this.customerForm.get('addresses') }

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['',[Validators.required,Validators.email]],
        confirmEmail:['']
      },{validator: CustomValidation.emailMatch}),
      phone: '',
      notification:'email',
      rating: [null, CustomValidation.ratingRange(1,5)],
      sendCatalog: true,
      addresses: this.formBuilder.array([this.buildAddress()])
    });

    this.customerForm.get('notification').valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setNotification(value));
  }

  buildAddress(): FormGroup {
    return this.formBuilder.group({
      addressType: 'home',
      streetAddress1: ['',Validators.required],
      streetAddress2: '',
      city:'',
      state:'',
      zip:''
    });
  }
  
  addAnotherAdress():void {
    this.addresses.push(this.buildAddress());
  }

  save(): void{
    console.log(this.customerForm.value);
    console.log(JSON.stringify(this.customerForm.value));
  }

  setNotification(notificationBy:string):void {
    const phoneControl = this.customerForm.get('phone');
    if(notificationBy === 'phone'){
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  initializeForm(){
    // this.customerForm.setValue({
    //   firstName:'raj',
    //   lastName:'Atch',
    //   email:'raj@test.com',
    //   sendCatalog:true
    // })

    this.customerForm.patchValue({
      firstName:'raj',
      lastName:'Atch'
    })
  }

  
}