import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  pattern =/^[a-zA-Z0-9!@#$%^&*]{8,16}$/
  patternemail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  alertText:string="";
  alertState:boolean = true
  alertStyle :any =""
  constructor() { }

  ngOnInit(): void {
    document.title="Log In"
    console.log(this.patternemail.test("mlkpjhbn@hgf"))
  }

  getVide(email:string,pwd:string){
    let res = []
    if (email == ""){
      res.push("E-mail")
    }
    if (pwd == ""){
      res.push("Password")
    }
    return res



  }
  login(email:string,pwd:string){
    if (email == "" || pwd == ""){
      this.alertText="Please fill all fields:"
      this.getVide(email,pwd).map((x:string)=>{
        this.alertText += (" -"+x)
      })
      this.setAlert("red")
    }
    else{
      if (!this.pattern.test(pwd)){
        this.alertText="invalid password!"
        this.setAlert("red")
      }
      else{
        if (!this.patternemail.test(email)){
          this.alertText="invalid email!"
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
