import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { }
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() 
  {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      response => {
        console.log(response)
        if ((response.grad === "Yes") || (response.grad === "No")) {
          localStorage.setItem("grad", response.grad)
        } else {
          localStorage.setItem("grad", "")
        }
        localStorage.setItem("username", response.username)
        localStorage.setItem("email", response.email)
        localStorage.setItem("user_type", response.user_type)
        localStorage.setItem("token", response.token)
        if (response.user_type === "student") {
          this.router.navigate(["/cv"])
        }
        else if (response.user_type === "company"){
          this.router.navigate(["/createCompetition"])
        }
        else {
          this.router.navigate(["/setTime"])
        }
      },
      error => {
        this.errorMessage = error.error.message;
        this.loginUserData["password"] = ""
      }
    )
  }
}
