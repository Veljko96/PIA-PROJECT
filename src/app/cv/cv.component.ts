import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  difference:Boolean=false;
  cvData = {username:""}
  saved_cv = null;
  
  username:string;
  image_src:String;

  myimage:String;
  upload:Boolean=false;
  constructor(private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.service.getCv(localStorage.getItem("email")).subscribe(response=>{
      console.log("ovde sam");
      if (response && (response.length>0))
      {
        this.saved_cv=response[0];
        this.cvData=response[0];
      }
    });

    this.service.getTime("student").subscribe(response=>{
      if (response && (response.length>0)) {
        let from = new Date(response[0].from as string);
        let to = new Date(response[0].to as string);
        let currentTime=new Date();
        if (currentTime>from && currentTime<to)
          this.upload=true;
        else
          this.upload=false;
      }
    });

  }

  saveCV(){
    this.cvData.username=this.username;
    this.service.editCV(this.cvData).subscribe(()=>{
      //Save cv
      this.difference=false;
      this.saved_cv=this.cvData;
      this.router.navigate(['/cv']);
    });
  }
  checkDiff(){
    if (this.saved_cv!=undefined)
      this.difference=true;
  }
}
