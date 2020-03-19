import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
public items:any=[]
public categories 
  constructor(public http:HttpClient) { }
public 
// GET ALL ITEMS FOR SEARCH RESULTS
  getAllItems(){
    return this.http.get("http://localhost:3000/items/all")
  }

  // GET ALL  CATEGORIES  FROM CATEGORIES TABLE 
  getAllCategories(){
    return this.http.get("http://localhost:3000/items/categories")
  }

  // GET ALL ITEMS BY CATEGORY ID FROM ITEMS TABLE 
  getProducts(category){
    return this.http.get("http://localhost:3000/items/"+category)
  }

  // GET AMOUNT OF ITEMS I STORE
  itemsAmount(){
    return this.http.get("http://localhost:3000/items/amount")
  }

  //----------------------------------------------ADMIN REQUESTS--------------------------------------------------- 
  
  // ADD NEW ITEM TO ITEMS TABLE 
  addNewItem(body){
    console.log(body);
    return this.http.post("http://localhost:3000/items/admin/add",JSON.stringify(body),{headers:new HttpHeaders({'Content-Type': 'application/json'})})
  }

  // UPDATE ITEM IN ITEMS TABLE
  updateItem(body){
    console.log(body);
    let itemId=body.id
    return this.http.put("http://localhost:3000/items/update/"+itemId,JSON.stringify(body),{headers:new HttpHeaders({'Content-Type': 'application/json'})})
  }
}
