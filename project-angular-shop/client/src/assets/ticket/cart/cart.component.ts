import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { localStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public user
  public cart
  public totalPrice: number = 0
  constructor(public cs: CartsService, public us: UsersService, public router: Router, public storage: localStorageService) { }

  ngOnInit() {
    console.log("blahhhhhhhhhhhhh");
    this.getCartItems()
    // setting user info and cart info
   console.log(this.cart);
  }

// get all cart items
  getCartItems() {
    if(this.storage.cart_id>0){
      console.log(this.storage.cart_id,"dcee,d,d");
      this.cs.cart = [this.cs.getCart(this.storage.cart_id).subscribe(
      res => {
        this.cs.cart = res
        if (this.cs.cart.length > 0) {
          console.log("ldaldaldl");
          // saving data in local storage
          if (this.cs.cart.length > 0) {
            this.storage.setStorage(this.cs.cart)
            if (this.storage.cartItems.length > 0) {
              console.log("blah");
              this.cart = this.storage.cartItems
              // getting user cart items
              this.us.user = [this.us.getUser(this.cart[0].cart_id).subscribe(
                res => {
                  this.us.user = res
                  this.cs.user =  res
                  if (this.us.user.length > 0) {
                    this.user = this.us.user
                    for (let i = 0; i <= this.storage.cartItems.length; i++) {
                      this.totalPrice += this.storage.cartItems[i].price
                      if (this.totalPrice > 0) {
                        this.cs.totalPrice = this.totalPrice
                        localStorage.setItem("totalPrice", `"${this.totalPrice}"`)
                      }
                    }
                  }
                },
                err => console.log(err)
              )]
            }
          }
        }
      },
      err => console.log(err)
      )]
    }
  }

  // deleting item from cart by item id and cart 
  del(car) {
    console.log(car);
    this.cs.del(car).subscribe(
      res => {
       this.getCartItems()
      },
      err => console.log(err)
    )
  }
  // deleting all items in cart by cart id
  delAll() {

    console.log(this.cart[0].cart_id);
    this.cs.delAll().subscribe(
      res=>window.location.reload(),
      err => console.log(err)
    )
  }

  // order and navidate to order page
  order() {
    this.router.navigateByUrl("/orders")
  }
}
