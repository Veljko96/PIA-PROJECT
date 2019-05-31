import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-fair',
  templateUrl: './create-fair.component.html',
  styleUrls: ['./create-fair.component.css']
})
export class CreateFairComponent implements OnInit {

  currentFair;
  username:String;
  new_fair = {}
  fairinfo_file : File;
  locations_str:String;
  logo_image : File;
  other_images : File;

  new_package_file : File;

  constructor(private service:AuthService,private router:Router) { }

  Slot_Time:String;
  slot_locations:String;
  Error_Message:String;
  Info_Message:String;
  AboutPackageMessage:String;

  currentRate:Number=3;
  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.new_fair["Slots"]=new Array<String>();
    console.log("alooo sine");
    this.service.getCurrentFair().subscribe(response=>{
        console.log(this.currentFair);
        console.log(response);
        if (response && response.length>0){
          console.log("aloooo" + response);
          this.currentFair=response[0];
        }
    });

  }
  createNewFair(){
    if (this.new_fair["Fair"]==undefined || this.new_fair["About"]==undefined || this.new_fair["Place"]==undefined || this.new_fair["Locations"]==undefined || this.new_fair["StartDate"]==undefined || this.new_fair["EndDate"]==undefined || this.new_fair["StartTime"]==undefined || this.new_fair["EndTime"]==undefined){
      this.Error_Message="ERROR, FAIR INFO MISSING!";
      return;
    }
    if (this.checkPackage()){
      this.Error_Message="PLEASE DEFINE PACKAGES!";
      return;
    }
    if (this.logo_image==undefined){
      this.Error_Message="PLEASE UPLOAD LOGO IMAGE!";
      return;
    }
    if (this.checkExtras()){
      this.Error_Message="PLEASE DEFINE PACKAGES EXTRAS!";
      return;
    }
    if (!this.new_fair["Slots"] || this.new_fair["Slots"].length==0){
      this.Error_Message="NO DEFINED SLOTS!";
      return;
    }
 
    this.service.uploadNewFile(this.logo_image).subscribe(response=>{
      //console.log("file_src: " + file_src);
      this.new_fair["LogoImage"]=response;
      console.log(this.new_fair);
      this.service.addNewFair(this.new_fair).subscribe(()=>{
        
        window.location.reload();
      });
    });
  }


  eventFileSelected(event) {
    console.log("usao sam ovde");
    this.fairinfo_file = <File>event.target.files[0];
    console.log(this.fairinfo_file);   
    var reader = new FileReader();
    reader.onload = () => {
      try{
        var read = reader.result;
        let json = read.toString();
        let jsonObject = JSON.parse(json);    
        this.new_fair=jsonObject.Fairs[0];
        console.log(this.new_fair); 
        this.new_fair["Slots"]=new Array<String>();
        this.new_fair["StartDate"]=this.new_fair["StartDate"].split('/').reverse().join('-');
        this.new_fair["EndDate"]=this.new_fair["EndDate"].split('/').reverse().join('-');
        this.Info_Message=undefined;
        //console.log(this.fair.StartDate);
        this.new_fair["Locations"]=jsonObject.Locations[0].Location;
        this.locations_str="";
        for(let i=0;i<jsonObject.Locations[0].Location.length;i++){
          this.locations_str+=""+jsonObject.Locations[0].Location[i].Name;
          if (i!=jsonObject.Locations[0].Location.length-1)
            this.locations_str+=", ";
          //console.log(obj.Locations[0].Location[i].Name);
        }
        this.new_fair["Locations"]=this.locations_str.split(", ");
        if (this.new_fair["Fair"]==undefined || this.new_fair["About"]==undefined || this.new_fair["Place"]==undefined || this.new_fair["Locations"]==undefined || this.new_fair["StartDate"]==undefined || this.new_fair["EndDate"]==undefined || this.new_fair["StartTime"]==undefined || this.new_fair["EndTime"]==undefined){this.Info_Message="Detected empty fields";}
      }catch(e){
          console.log(e);
          this.Info_Message="Error, wrong file format";
      }
      
    };       
    reader.readAsText(this.fairinfo_file, 'UTF-8');
     
  }

  eventLogoPut(event){
    this.logo_image = event.target.files[0];
  }
  eventOtherImagesPut(event){
    this.other_images = event.target.files[0];
  }

  addLoc(){
    try{
      this.new_fair["Locations"]=this.locations_str.split(", ");
    }catch(e){
    }
  }
  addThisSlot(){
    this.new_fair["Slots"].push(this.Slot_Time+" ("+this.slot_locations+")");
  }
  removeThisSlot(slot:String){
    let slott = Array<String>();
    for(let i =0;i<this.new_fair["Slots"].length;i++){
      if (slot!=this.new_fair["Slots"][i]){
        slott.push(this.new_fair["Slots"][i]);
      }
    }
    this.new_fair["Slots"]=slott;
  }
  eventJSONFilePut(event){
    this.new_package_file = <File>event.target.files[0];   
    var r = new FileReader();
    r.onload = () => {
      try{
        this.AboutPackageMessage=undefined;
        var read = r.result;
        let json = read.toString();
        console.log(json);
        let jsonObject = JSON.parse(json);    
        this.new_fair["Packages"]=jsonObject.Packages;
        this.new_fair["Additional"]=jsonObject.Additional;
      }catch(e){
          console.log(e);
          this.AboutPackageMessage="ERROR parsing package json";
      }
      
    };       
    r.readAsText(this.new_package_file, 'UTF-8');
     
  }
 
  checkPackage():Boolean{
    try{
      for(let i=0;i<this.new_fair["Packages"].length;i++){
        let p = this.new_fair["Packages"][i];
  
          if (p.Title==undefined || p.Content==undefined || p.VideoPromotion==undefined || p.NoLessons==undefined || p.Price==undefined || p.MaxCompanies==undefined || p.NoWorkchops==undefined || p.NoPresentation==undefined){        
            this.AboutPackageMessage="ERROR, PACKAGE FORMAT IS NOT CORRECT";
            return true;
          }
  
      }
    }catch(err){
      this.AboutPackageMessage="ERROR, PACKAGE FORMAT IS NOT CORRECT";
      return true;
    }
    return false;
  }
  checkExtras():Boolean{
    try{
      for(let i=0;i<this.new_fair["Additional"].length;i++){
        let a = this.new_fair["Additional"][i];
        
            if (a.Title==undefined || a.Price==undefined){
              this.AboutPackageMessage="ERROR, PACKAGE FORMAT IS NOT CORRECT";
              return true;
            }
            
      
      }
    }catch(err){
      this.AboutPackageMessage="ERROR, PACKAGE FORMAT IS NOT CORRECT";
      return true;
    }
    return false;
  }

}
