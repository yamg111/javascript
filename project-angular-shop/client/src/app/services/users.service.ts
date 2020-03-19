import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http"
// import {registerLocaleData } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public admin
  public user
  constructor(public http:HttpClient) { }

  login(body){
    return this.http.post("http://localhost:3000/users/login",JSON.stringify(body),{headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

// REGISTRATION

// users details for validation
usersInfo(){
  return this.http.get("http://localhost:3000/users/info")
}

// sending new user info 
register(body){
  return this.http.post("http://localhost:3000/users/register",JSON.stringify(body),{headers: new HttpHeaders({'Content-Type': 'application/json'})})
}

  // getting user details by cart_id
  getUser(id){
    return this.http.get("http://localhost:3000/users/loged/"+id)
  }
}


