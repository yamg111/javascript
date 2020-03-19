import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ResizeEvent } from 'angular-resizable-element';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { localStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-homepage-u',
  templateUrl: './homepage-u.component.html',
  styleUrls: ['./homepage-u.component.css'],
  styles: [
    `
      mwlResizable {
        box-sizing: border-box; // required for the enableGhostResize option to work
      }
    `
  ]
})
export class HomepageUComponent implements OnInit {
public width:number
public categories
public products 
public prod
public amount=0
public searchVal
public searchResults

  constructor(public is:ItemsService, public cs:CartsService,public router:Router,public storage:localStorageService,public us:UsersService) { }

  ngOnInit() {
    this.validation()
    this.getAllItems()
    this.getAllCategories()
  }
  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.width=event.rectangle.width
  }
// validation for user  
validation() {
  if (!localStorage.token) {
    this.router.navigateByUrl("/login")
  }

}


  // function for saving all products in store
getAllItems(){
  if(this.storage.cart_id>0){
    this.is.getAllItems().subscribe(
      res=>{this.is.items=res
        if(this.is.items.length>0){
          this.searchResults=res
          
          console.log(this.searchResults);
        }},
        err=>console.log(err)
        )
      }
    }

  // get all categories
  getAllCategories(){
    this.categories=[this.is.getAllCategories().subscribe(
      res=>{this.categories=res 
      if(this.categories.length>0){
        console.log(this.categories)
      }},
      err=>console.log(err)
    )]
  }

  // get products by category 
  getProducts(category){
    this.is.getProducts(category).subscribe(
      res=>this.products=res,
      err=>console.log(err)
    )
  }

    // add and del functions for updating items amount
    add(product){
          this.prod=product.id
          this.amount++
      }
    
    del(){
      if(this.amount>0){
        this.amount--
      }
    }
    submit(product){
      if(this.storage.cart_id){

        let body={"item_id":product.id,"amount":this.amount}
        console.log(body);
        if(body.item_id==product.id &&body.amount==this.amount){
          
          this.cs.addNewItem(body).subscribe(
            res=>{
              console.log(body);
              if(!this.storage.cartItems){
                this.storage.setStorage(res)
                if(this.storage.cartItems.length>0){
                  window.location.reload()
                }
              }else{
                window.location.reload()}
              },
              err=>console.log(body)
              )   
              this.amount=0 
            }
          }
        }
          
    

    // clear local storage and log out
    Logout(){
      this.storage.cartItems=[]
      this.storage.cart_id=[]
      this.storage.totalPrice=0
      localStorage.clear()
      this.router.navigateByUrl("/login")
    }
}
