import { Inject,Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

 const STORAGE_KEY = 'cartItems'

 
 

@Injectable({ 
  providedIn: 'root'
})
export class localStorageService {
public cartItems:any=[]
public email:string
public cart_id=this.storage.get("cart_id")
public totalPrice=this.storage.get("totalPrice")
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
 


// setting data from storage
 setStorage(obj:any):void{
  localStorage.setItem("cartItems",JSON.stringify(obj))
  if(localStorage.cartItems.length>0){
   this.cartItems = this.storage.get(STORAGE_KEY) || [];
    if(this.cartItems.length>0){
      console.log(this.cartItems, this.cart_id);
    }
  }
 }
 
  // getting data from storage
getStorage(){
  this.cartItems = this.storage.get(STORAGE_KEY) || [];
  //  this.email=this.storage.get("email")
    if(this.cartItems.length>0){
      console.log(this.cartItems, this.cart_id);
    }
}
getCartId(){
  this.cart_id=this.storage.get("cart_id")
}
}
