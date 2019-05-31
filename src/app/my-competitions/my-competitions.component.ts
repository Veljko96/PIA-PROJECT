import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent implements OnInit {

  constructor( private service:AuthService, private router:Router) { }

  email:string;
  competitions : Array<any>
  my_competitions : Array<any>
  applies: Array<any>

  ngOnInit() {
    this.email = localStorage.getItem("email");

    this.service.getAllCompetitions(undefined,undefined).subscribe(response=>{
      if (response && (response.length>0))
      {
        console.log(response);
        this.competitions=response;

          this.service.getAllApplies().subscribe(response=>{
            if (response && (response.length>0))
            {
              console.log(response);
              this.applies=response;
              this.my_competitions=new Array<any>();
              for(var i=0;i<this.competitions.length;i++){
                let competition=(this.competitions[i]) as any;
                for(var j=0;j<this.applies.length;j++) {
                  let app=this.applies[j];
                  if (competition._id==app.Competition_Id && app.Email==this.email) {
                    if (competition.End) {
                      this.my_competitions.push(competition);
                      break;
                    }
                  }
                }
              }
            }
        });
      }
    });
    

  }
}
