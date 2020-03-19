import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ReqOrdersService } from 'src/app/services/req-orders.service';
import { ItemsService } from 'src/app/services/items.service';
import { CartsService } from 'src/app/services/carts.service';
import { localStorageService } from 'src/app/services/local-storage.service';
import * as moment from 'moment';
import { ArrayType } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  public ordersAmount
  public itemsAmount
  public id
  public continue = ""
  public chackCart: boolean = false
  public cartDate
  public cart
  public firstTime: boolean = false
  public lastTime: boolean = false

  public totalPrice:Number=0
  constructor(public storage: localStorageService, public cs: CartsService, public is: ItemsService, public rOs: ReqOrdersService, public fb: FormBuilder, public us: UsersService, public router: Router) { }

  ngOnInit() {
    // defining form
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
    this.allOrdersAndItems()
  }
  // loging 
  login(form) {
    console.log(this.form.value);
    if (this.form.value) {
      this.us.login(this.form.value).subscribe(
        res => {
          this.us.admin = res['admin']
          localStorage.setItem("token", res['token'])
          localStorage.setItem("email", this.form.value.email)
          // chacking admin or user
          if (this.us.admin == true) {
            this.router.navigateByUrl("/homepage-a")
          } else {
            console.log(this.form.value);
            this.getCosCart(this.form.value)

          }
        },
        err => alert("something is not correct")
      )
    }
  }
  // chacking if costumer has a cart or not
  getCosCart(form) {
    this.cs.newCart(form).subscribe(
      res => {
        console.log(res)
        if (res[0].id) {
          this.cs.cartId = res
          this.continue = "Continue shopping"
          this.chackCart = true
          localStorage.setItem("cart_id", res[0].id)
          // get total price
          let cartId=res[0].id
          this.getTotalPrice(cartId)

          // getting current cart creation date
          this.cs.getDate(res[0].id).subscribe(
            res => {
              console.log(res)
              this.cartDate = moment(res[0].date_of_creation).format("DD-MM-YYYY")
            },
            err => console.log(err)
          )
        } else {
          // chacking user last order by last cart id
          if(res[0].LastOrder){
            console.log(res[0].LastOrder);
            this.rOs.lastOrder(res[0].LastOrder).subscribe(
              res=>{console.log(res)
                this.continue="start shopping"   
              this.cartDate=res
              this.cartDate[0].shipping_date= moment(this.cartDate[0].shipping_date).format("DD-MM-YYYY")
              this.cartDate[0].order_date= moment(this.cartDate[0].order_date).format("DD-MM-YYYY")
              this.lastTime=true
              
              console.log(this.cartDate);},
              err=>console.log(err)    
              )
            }else{
              res=>{console.log(res);}
            // first time user is getting in shop
            this.continue = "Let's start !"
              this.firstTime=true
  
            }
        }
      },
      err => console.log(err)
    )
  }


  //chacking token throw local storag 
  validation() {
    if (localStorage.token) {
      if (this.us.admin == true) {
        this.router.navigateByUrl("/homepage-a")
      }else{
        this.router.navigateByUrl("/homepage-u")
      } 
    }

  }

  //continue or start shopping button  
  continueWithShop() {
    if(this.lastTime==true || this.firstTime==true){
      this.newCart(this.form.value)
      this.router.navigateByUrl("/homepage-u")
    }else{
      this.validation()
    }
  }

  // creating new cart for user
  newCart(form){
    this.cs.newUserCart(form).subscribe(
      res=>{
        console.log(res,"ddddddddddd");
        this.id=res
        this.cs.cartId = res
        localStorage.setItem("cart_id",JSON.stringify(res))
        localStorage.setItem("cartItems",JSON.stringify([]))
        if(this.storage.cart_id>0){
          console.log("ok");
        }
        },
      err=>console.log(err)
      )

  }
  // calculate total price of cart
  getTotalPrice(cartId) {
   
    console.log(cartId);
    this.cs.getCart(cartId).subscribe(
      res => {
        console.log(res);
        this.cart = res
        this.storage.setStorage(res)
        if (this.cart.length > 0) {

          console.log(this.storage.cartItems);
            for (let i = 0; i <= this.cart.length; i++) {
              console.log(this.cart[i].price);
              this.totalPrice += this.cart[i].price
              console.log(this.totalPrice);
              if (this.totalPrice > 0) {
                console.log(this.totalPrice);
              }
            }
            if(this.totalPrice>0){

              this.storage.totalPrice=this.totalPrice
            }
        }
      },
      err=>console.log(err))
  }
  // fumction for opening register component
  registerNav() {
    this.router.navigateByUrl("/register")
  }

  // save orders and items amount
  allOrdersAndItems() {
    this.rOs.allOrders().subscribe(
      res => {
      this.ordersAmount = res
        console.log(this.ordersAmount)
      },
      err => console.log(err)
    )
    this.is.itemsAmount().subscribe(
      res => this.itemsAmount = res,
      err => console.log(err)
    )
  }

}

