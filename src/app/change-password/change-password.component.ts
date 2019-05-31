import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeUserPasswordData = { }
  messageError
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  changePassword()
  {
    this.auth.changePassword(this.changeUserPasswordData)
    .subscribe(
      response => {
        this.router.navigate(["/login"])
      },
      error => {
        console.log(error)
        this.messageError = error.error.message
      }
    )
  }
}
