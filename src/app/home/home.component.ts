import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  AppliesData : Array<Object>;
  CV : Object;

  constructor(private auth: AuthService, private router: Router) { }

  
    /*Like  a subscribe
    this.service.getSomething()
    .subscribe(
      request => this.something = something,
      error => if(error instanceof HttpErrorResponse)
      {
        if(error.status === 401)
        {
          this.Router.navigate(["/login"])
        }
      })*/
  ngOnInit() {
    this.auth.getMyApplies(localStorage.getItem("email"))
    .subscribe(response =>{
      console.log(response)
      this.AppliesData = response
    },
    error=> console.log(error))
  }

}
