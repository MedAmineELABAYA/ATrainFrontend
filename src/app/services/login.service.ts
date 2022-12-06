import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkEmail(email : string){
    return this.http.get(environment.backendAPI+"testmail", {params:{"email":email},responseType:'json'})
  }
  getUser(email : string,password: string){
    return this.http.get(environment.backendAPI+"login", {params:{"email":email,"password":password},responseType:'json'})
  }
  addUser(fname:string,lname:string,email:string,password:string){
    return this.http.get(environment.backendAPI+"register", {params:{"fname":fname,"lname":lname,"email":email,"password":password},responseType:'text'})
  }
}
