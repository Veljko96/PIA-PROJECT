import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_type1
  search_type2
  type;
  date2 = new Date()
  searchData = {Competition_Name:"",
                Company_Name:""}
  companiesData : Array<Object>;
  competitionsData : Array<Object>;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  search() {
      if (this.search_type1 === true && this.search_type2 === true) {
        this.type = "both";
      } else if (this.search_type1 === true && this.search_type2 !== true) {
        this.type = "job";
      } else {
        this.type = "internship";
      }
      this.auth.getCompanies(this.searchData.Company_Name)
      .subscribe((companiess: Array<Object>) => {
        this.companiesData = companiess
      })

      console.log(this.type);
      
      this.auth.getCompetitions(this.searchData.Competition_Name, this.type)
      .subscribe((competitionss: Array<Object>) => {
        console.log(competitionss)
        this.competitionsData = competitionss
      })
    
  }

  openCompany(id) {
    this.router.navigate(["/home/:id"])
  }

  compareDates(isEnd) : boolean {
    
    if (isEnd === true) return true;
    else return false;
    
  }
}
