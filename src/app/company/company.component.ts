import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  CompanyData : Object;
  CompetitionsData : Array<Object>;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.getCompany(this.route.snapshot.paramMap.get('id'))
      .subscribe(response => {
        console.log(response)
        this.CompanyData = response
        
      },
      error => console.log(error))
      
    this.auth.getCompetitionsByCompany(this.route.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.CompetitionsData = response
    },
    error => console.log(error))
  }

}
