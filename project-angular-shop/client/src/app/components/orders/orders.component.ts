import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ReqOrdersService } from 'src/app/services/req-orders.service';
import * as moment from 'moment';
import { localStorageService } from 'src/app/services/local-storage.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public cart=this.storage.cartItems
  public totalPrice
  public form2: FormGroup
  public products
  public loading: boolean
  public searchResults = this.cart
  public searchVal: string
  public user: any
  public empty = ""
  public empty2 = ""
  public ticket: boolean = false
  public userId

  constructor(public storage: localStorageService, public rOs: ReqOrdersService, public us: UsersService, public cs: CartsService, public fb: FormBuilder, public is: ItemsService, public router: Router) {
  }

  ngOnInit() {
    this.validation()
    this.getStorage()
    console.log(this.storage.cartItems);
    // defining cart,user and total price
    if (this.storage.cartItems.length > 0) {
      this.getTotalPrice()
    }


    // form value and validators
    this.form2 = this.fb.group({
      city: ["city", Validators.required],
      street: ["street", [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      shippingDate: ["", Validators.required],
      creditCard: ["", [Validators.required, Validators.min(12), Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]],
    })

  }

  getStorage() {
    // getting data from storage to cartItems
    this.storage.getStorage()
    if (this.storage.cartItems.length > 0) {
      this.searchResults=this.storage.cartItems
      this.us.getUser(this.storage.cartItems[0].cart_id).subscribe(
        res => {
          this.cart=this.storage.cartItems
        this.user = res
          this.totalPrice = JSON.parse(this.storage.totalPrice)
        },
        err => console.log(err)
      )
    }
  }
// validation for token
  validation() {
    if (!localStorage.token) {
      this.router.navigateByUrl("/login")
    }
  
  }
  
  // defining cart,user and total price
  getTotalPrice() {
    this.cart = this.storage.cartItems
    // this.totalPrice=this.cs.totalPrice
    this.user = this.cs.user
    if (this.cart.length > 0) {
      console.log(this.cart);
      this.us.getUser(this.storage.cart_id).subscribe(
        res => {
        this.userId = res[0].id
          console.log(this.userId)
        },
        err => console.log(err)
      )
    }


  }


  // back to main page
  back() {
    this.router.navigateByUrl("/homepage-u")
  }

  // on dblclick
  dbl(name) {
    switch (name) {
      case "city": {
        this.empty = this.user[0].city
        break;
      }
      case "street": {
        this.empty2 = this.user[0].street
        break;
      }

    }
  }

  // clear localstorage
  logout() {
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

  // sending new order request
  newOrder(form2) {
    console.log(this.form2.value)
    this.empty = this.user[0].city
    this.empty2 = this.user[0].street
    let number = this.form2.value.creditCard
    let credit = number.slice(number.length - 4)
    let newDate = moment(this.form2.value.shippingDate).format("YYYY-MM-DD")
    console.log(newDate);
    let obj = { "cart_id": this.cart[0].cart_id, "price": this.totalPrice, "city": this.empty, "street": this.empty2, "shipping_date": newDate, "credit": credit }
    this.rOs.newOrder(obj).subscribe(
      res => {
        // chacking if all shippings are unavailable
        if (res>=3) {
          alert(`all shippings on "${newDate}" are full, please choose another date :)`)
         
          //chacking if user alredy did an order 
        } else if(res=="1") {
          alert("your order already been recived")
        }else{
          this.ticket = true
        }
      },
      err => console.log(err)
    )
  }
// ticket functions for converting html into pdf

download(){

  const options={
    fileName:'ticket',
    html2canvas:{},
    jsPDF:{orientation:'landscape'}
  }
  let doc = new jspdf({
    unit: 'in',
    format: [4, 8]
  })
  const content:Element=document.getElementById('pdfContent')
  html2pdf()
  .from(content)
  .set(options)
  .save()
}  
  // route to main page
  confirm() {
    this.router.navigateByUrl("/homepage-u")
  }
}
