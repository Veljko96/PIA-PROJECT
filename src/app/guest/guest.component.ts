import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  
  searchData = {
                Company_Name:"",
                City:""}
  companiesData : Array<Object>;
  activities : String[];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  search() {
    this.companiesData=new Array<any>();
    if(this.activities != undefined) {
      for(var i=0;i<this.activities.length;i++) {
        this.auth.getCompaniesGuest(this.searchData.Company_Name, this.activities[i], this.searchData.City)
        .subscribe((companiess: Array<Object>) => {
          for(var j=0;j<companiess.length;j++)
            {
              this.companiesData.push(companiess[j]);
              console.log(this.companiesData[j]);
            }
        });
      }
    } else {
      this.auth.getCompaniesGuest(this.searchData.Company_Name, undefined, this.searchData.City)
      .subscribe((companiess: Array<Object>) => {
        for(var j=0;j<companiess.length;j++)
          {
            this.companiesData.push(companiess[j]);
            console.log(this.companiesData[j]);
          }
      })
    } 

    
  }

}
