import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import {MatDialog, MatDialogRef,MatDialogConfig} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { UpdateComponent } from '../update/update.component';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-homepage-a',
  templateUrl: './homepage-a.component.html',
  styleUrls: ['./homepage-a.component.css']
})
export class HomepageAComponent implements OnInit {
  public categories
  public products 
  public prod
  public amount=0
  
  constructor(public is:ItemsService, public dialog: MatDialog,public router:Router,public us:UsersService) { }

  ngOnInit() {
    this.validation()
    this.getAllItems()
    this.getAllCategories()
  }

  // validation for admin  
  validation() {
    if (localStorage.token) {
      if (this.us.admin == false) {
        this.router.navigateByUrl("/login")
      }
    }else{
      this.router.navigateByUrl("/login")
    }

  }

 
  // function for saving all products in store
getAllItems(){
  this.is.getAllItems().subscribe(
res=>{this.is.items=res
  if(this.is.items.length>0){
    console.log(this.is.items);
  }},
err=>console.log(err)
    )
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

    
    // add new item
    openDialog(){
      const dialogRef = this.dialog.open(AddComponent, {
        width: '1000px',
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
    }

    // clear local storage and log out
    Logout(){
      localStorage.clear()
      this.router.navigateByUrl("/login")
    }

    // update item in items table from admin page 
    openDi(product){
      console.log(product);
      let dialogRef = this.dialog.open(UpdateComponent, {
        data: {
          "id": product.id,
          "item_name": product.item_name,
          "price":product.price,
          "image_url":product.image_url
        },
    
      })
    }
}
