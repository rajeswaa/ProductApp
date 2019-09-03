import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from './ICustomer';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer: Customer = new Customer();
  title: string = 'Customer Sign up';

  save(customerForm: NgForm):void{
    alert("YES");
    console.log(customerForm.form);
    console.log(JSON.stringify( customerForm.value));
  }
  
  constructor() { }

  ngOnInit() {
  }
}
