import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';
import { localStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  public cart:any
  public user
  public totalPrice:number
  public cartId
  constructor(public http:HttpClient,public storage: localStorageService) { }

  // getting current loged user cart creation date by cart_id
  getDate(cart_id){
    console.log(cart_id);
    return this.http.get("http://localhost:3000/carts/cart/"+cart_id)
  }

  // getting current loged user cart_items details
  getCart(cart_id){
    console.log(cart_id);
    this.cartId=cart_id
    return this.http.get("http://localhost:3000/carts/"+cart_id)
  }
 
  
  // adding new item to cart_items
  addNewItem(body){
    console.log(body);
    this.storage.getCartId()
    if(this.storage.cart_id>0){
      console.log(this.storage.cart_id);
      let id=this.storage.cart_id
      return this.http.post("http://localhost:3000/carts/add/"+id,JSON.stringify(body),{headers: new HttpHeaders({'Content-Type': 'application/json'})})
    }
    
  }

  // deleting item from cart_items
  del(body){
    let carId=body.cart_id
    const headers:any=new HttpHeaders({
      'Content-Type':'application/json'
    })      
    return this.http.post("http://localhost:3000/carts/"+carId,JSON.stringify(body) ,{headers})
  }

// deleting all items in cart by cart id
    delAll(){
            const headers:any=new HttpHeaders({
        'Content-Type':'application/json'
      })    
      let carId=this.storage.cart_id
      const url=`http://localhost:3000/carts/${carId}`
      return this.http.delete(url,{headers})
    }

    // chacking user cart status
    newCart(body){
      console.log(body);
      const headers:any=new HttpHeaders({
        'Content-Type':'application/json'
      })
      return this.http.post("http://localhost:3000/carts/new",JSON.stringify(body),{headers})
    }

    // creating new cart for a user with no cart
    newUserCart(body){
      console.log(body);
      const headers:any=new HttpHeaders({
        'Content-Type':'application/json'
      })
      return this.http.post("http://localhost:3000/carts/newCart",JSON.stringify(body),{headers})
    }

}
