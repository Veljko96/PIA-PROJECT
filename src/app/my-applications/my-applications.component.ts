import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  username:String;

  competitions:Array<any>;
  my_competitions:Array<any>;
  applies:Array<any>;
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit() {
    //Session get username-----------------------------------------
    this.username = localStorage.getItem("username");

    this.resetAll();
  }


  getMyOffers(){
    this.my_competitions=new Array<any>();
    console.log(this.competitions);
    for(var i=0;i<this.competitions.length;i++){
      console.log("usaoooooo")
      let comp=(this.competitions[i]) as any;
      console.log(comp);
      for(var j=0;j<this.applies.length;j++)
      {
        console.log("usao i ovdeeee");
        let app=this.applies[j];
        console.log(app);
        //===================================================================================================================================
        if (comp.Company_username==this.username)
        {
          console.log("test: " + comp.End + ", " + this.isOver(comp.DateTo));
            if (!comp.End && this.isOver(comp.DateTo))
            {
              this.my_competitions.push(comp);
              break;
            }
        }
      }
    }
  }
  isOver(date:String):Boolean{
    var now = new Date(); 
    var then = new Date(date as string);
    //console.log("now: "+ now);
    //console.log("compare: "+ then);

    if (now>then)
    {
      //console.log("res: "+ true);
      return true;
    }
    else{
      //console.log("res: "+ false);
      return false;
    }
        
}
resetAll(){
  //Get Offers
  this.service.getAllCompetitions(undefined,undefined).subscribe(response=>{
    if (response && (response.length>0))
    {
      this.competitions=response;

      //Get Applications
        this.service.getAllApplies().subscribe(response=>{
          if (response && (response.length>0))
          {
            console.log(response);
            this.applies=response;
            this.getMyOffers();
            console.log(this.my_competitions);
          }
      });
    }
  });
}
finishOffer(competition){
  this.service.finishOffer(competition._id).subscribe((response)=>{
    this.resetAll();
  });
}
changeStatus(apply,Accepted:String){
  console.log(apply._id);
  this.service.changeStatusApply(apply._id,Accepted).subscribe((objs)=>{
    this.resetAll();
  });
}

}
