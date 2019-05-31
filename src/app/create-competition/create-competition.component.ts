import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent implements OnInit {

  
  competitionData = {Company_username:String,
                     Company_Name:String,
                     End:Boolean,
                     DateTo:String,
                     Type:String}
  competition_time = ""
  competition_date = ""
  pom;
  pom2;
  pom1;
  type1;
  type2;
  competition_file : File;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getCompanyByEmail(localStorage.getItem("email"))
    .subscribe(response =>{
      console.log("koji sam ja meni kralj");
      console.log(response)
      this.competitionData.Company_username = response.Username;
      console.log(this.competitionData.Company_username);
      this.competitionData.Company_Name = response.Company_Name;
      this.pom2 = false;
      this.competitionData.End = this.pom2;
    },
    error => console.log(error))
  }

  createCompetition() {
    this.auth.uploadNewFile(this.competition_file)
    .subscribe(response=>{
      console.log(response);
      this.competitionData["File"] = response;
    });
    if (this.type1 === true && this.type2 !== true) {
      this.pom1 = "job";
      this.competitionData.Type = this.pom1;
    } else if (this.type2 === true && this.type1 !== true) {
      this.pom1 = "internship";
      this.competitionData.Type = this.pom1;
    }
    this.auth.createCompetition(this.competitionData)
    .subscribe(
      response => {
        console.log(response)
        window.location.reload();
      },
      error => console.log(error)
    )
  }

  converter(){
    //Convert date
    if (!this.competition_date) return;
    if (!this.competition_time) return;

    let dateToString = this.competition_date+'T'+this.competition_time; 
    let newDate = new Date(dateToString);
    this.pom = newDate.toString();
    this.competitionData.DateTo= this.pom
    //console.log("time changed: " + newDate);
    //console.log("isOver: " + this.offer.isOver());
  }

  insertFile(event){
    this.competition_file = event.target.files[0];
    //this.offer.file = this.offer_file.name;
    //console.log(this.offer_file);
  }

}
