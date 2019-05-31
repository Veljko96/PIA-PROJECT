import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.css']
})
export class SetTimeComponent implements OnInit {

  username:String;
  student_from_d:String;
  student_to_d:String;
  company_from_d:String;
  company_to_d:String;

  constructor(private router:Router, private service:AuthService) { }
 
  ngOnInit() {
    this.username = localStorage.getItem("username");
  }
  setTimeCompany(){
    if (this.company_from_d==undefined || this.company_to_d==undefined) return;
    this.service.setTimeCompany(this.company_from_d,this.company_to_d).subscribe(response=>{
      console.log(response);
      window.location.reload();
    });
  }

  setTimeCV(){
    if (this.student_from_d==undefined || this.student_to_d==undefined) return;
    this.service.setTimeCV(this.student_from_d,this.student_to_d).subscribe(response=>{
         console.log(response);
         window.location.reload();
    });
  }

}
