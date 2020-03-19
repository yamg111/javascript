import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqOrdersService {

  constructor(public http:HttpClient) { }
 
  // insert into orders new order
  newOrder(body){
    console.log(body);
    return this.http.post("http://localhost:3000/orders/new",JSON.stringify(body),{headers:new HttpHeaders({'Content-Type': 'application/json'})})
  }

  // return all orders in store
  allOrders(){
    return this.http.get("http://localhost:3000/orders/amount")
  }
  
  // return current user last order details by cart id
  lastOrder(cart_id){
    return this.http.get("http://localhost:3000/orders/details/"+cart_id)
  }
}
