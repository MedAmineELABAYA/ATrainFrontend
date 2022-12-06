import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  pattern =/^[a-zA-Z0-9!@#$%^&*]{8,16}$/
  patternemail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  alertText:string="";
  alertState:boolean = true
  alertStyle :any =""
  constructor() { }

  ngOnInit(): void {
    document.title="Register"
  }
  getVide(fname:string,lname:string,email:string,pwd:string){
    let res = []
    if (fname == ""){
      res.push("First Name")
    }
    if (lname == ""){
      res.push("last Name")
    }
    if (email == ""){
      res.push("E-mail")
    }
    if (pwd == ""){
      res.push("Password")
    }
    return res



    }
  register(fname:string,lname:string,email:string,pwd:string){
    if (fname == "" || lname == "" || email == "" || pwd == ""){
      this.alertText="Please fill all fields:"
      this.getVide(fname,lname,email,pwd).map((x:string)=>{
        this.alertText += (" -"+x)
      })
      this.setAlert("red")
    }
    else{
      if (!this.pattern.test(pwd)){
        this.alertText="password should contain atleast one number and one special character"
        this.setAlert("red")
      }
      else{
        if (!this.patternemail.test(email)){
          this.alertText="Please type a valid email"
          this.setAlert("red")
        }
        else {
          this.alertText = "wow good"
          this.setAlert("green")
        }
      }
    }
  }
  setAlert(color:string){
    this.alertState =false
    this.alertStyle ={color:color}
  }

}
