import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  CompId
  emaill
  no
  fal
  CompetitionData = {Competition_Name:String}
  cover_letter_type = ""
  applyData = {CV:Object,
               Email:String,
               Competition_Id:String,
               Competition_Name:String,
               Accepted:String,
               First_Name:String,
               Last_Name:String,
               PDFFile:Object,
               Cover_Letter:String
               };
  apply_file : File;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.getCompetition(this.route.snapshot.paramMap.get('id'))
    .subscribe(response =>{
      console.log(response)
      this.CompetitionData = response
    },
    error => console.log(error))

    this.auth.getCv(localStorage.getItem("email"))
    .subscribe(response => {
      console.log(response)
      this.applyData.CV = response
    },
    error => console.log(error));

    this.auth.getStudent(localStorage.getItem("email"))
    .subscribe(response=>{
      console.log(response);
      this.applyData.First_Name = response.First_Name;
      this.applyData.Last_Name = response.Last_Name;
    })
  }

  applyForCompetition() {
    this.emaill = localStorage.getItem("email")
    this.applyData.Email = this.emaill
    this.CompId = this.route.snapshot.paramMap.get('id')
    this.applyData.Competition_Id = this.CompId
    this.applyData.Competition_Name = this.CompetitionData.Competition_Name
    this.no = "Applied"
    this.applyData.Accepted = this.no
    
    if (this.cover_letter_type === "pdf") {
      this.auth.uploadNewFile(this.apply_file)
      .subscribe(response=>{
        console.log(response);
        this.applyData.PDFFile = response;
        this.auth.saveApply(this.applyData)
        .subscribe(response => {
          console.log(response)
          this.router.navigate(["/cv"])
    },
    error => console.log(error))
        
      })
    }
    else {
      this.auth.saveApply(this.applyData)
        .subscribe(response => {
          console.log(response)
          this.router.navigate(["/cv"])
    },
    error => console.log(error));
        
      
    }

  }

  insertFile(event) {
    this.apply_file = event.target.files[0];
  }

}
