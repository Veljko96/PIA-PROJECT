import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = "http://localhost:3000/api/register"
  private loginURL = "http://localhost:3000/api/login"
  private changePasswordURL = "http://localhost:3000/api/change_password"
  private cvCreateURL = "http://localhost:3000/api/cvCreate"
  private companiesURL = "http://localhost:3000/api/companies"
  private competitionsURL = "http://localhost:3000/api/competitions"
  private companyURL = "http://localhost:3000/api/company"
  private competitionURL = "http://localhost:3000/api/competition"
  private competitionsByCompanyId = "http://localhost:3000/api/competitionsByCompany"
  private cvURL = "http://localhost:3000/api/cv"
  private applyURL = "http://localhost:3000/api/apply"
  private createCompetitonUrl = "http://localhost:3000/api/createCompetition"
  private companyByEmailUrl = "http://localhost:3000/api/companyByEmail"
  private myAppliesUrl = "http://localhost:3000/api/myAppliesUrl"
  private editCv = "http://localhost:3000/api/editCv"
  private urlOffers = "http://localhost:3000/api/getOffers"
  private urlAllCompetitions = "http://localhost:3000/api/allCompetitions"
  private studentURL = "http://localhost:3000/api/student"
  private finishCompURL = "http://localhost:3000/api/finishComp"
  private changeStatusURL = "http://localhost:3000/api/changeStatus"
  private timeCompanyURL = "http://localhost:3000/api/timeCompany"
  private timeCVURL = "http://localhost:3000/api/timeCV"
  private justTimeURL = "http://localhost:3000/api/getTime"
  private currentFairURL = "http://localhost:3000/api/getCurrentFair"
  private addFairURL = "http://localhost:3000/api/addNewFair"
  private newImageURL = "http://localhost:3000/api/uploadNewImages"
  private getImageURL = "http://localhost:3000/api/getImage"
  private filesURL = "http://localhost:3000/api/files"
  private guestURL = "http://localhost:3000/api/guest"

  constructor(private http: HttpClient, private router: Router) 
  { 

  }

  registerUser(user)
  {
    return this.http.post<any>(this.registerURL, user)
  }

  loginUser(user)
  {
    return this.http.post<any>(this.loginURL, user)
  }

  logoutUser()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("grad")
    localStorage.removeItem("createdCV")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
  }

  changePassword(user)
  {
    return this.http.post<any>(this.changePasswordURL, user)
  }

  loggedIn()
  {
    //!! to return boolean value, not a token itself
    return !!localStorage.getItem("token")
  }

  getToken()
  {
    return localStorage.getItem("token")
  }

  isStudent()
  {
    if (localStorage.getItem("user_type") === "student") {
      return true
    }
    return false
  }

  isAdmin()
  {
    if (localStorage.getItem("user_type") === "administrator") {
      return true
    }
    return false
  }

  getStudent(email) {
    return this.http.get<any>(`${this.studentURL}/${email}`)
  }

  createCV(cv)
  {
    return this.http.post<any>(this.cvCreateURL, cv)
  }

  noCV()
  {
    if (localStorage.getItem("createdCV") === "No") {
      return true
    }
    return false
  }

  getCompanies(Company_Name)
  {
    const data = {
      Company_Name:Company_Name
    }
    return this.http.post<any>(this.companiesURL,data)
  }

  getCompetitions(Competition_Name, type)
  {
    const compData = {
      Competition_Name:Competition_Name,
      type:type
    }
    console.log(compData.type);
    console.log(compData.Competition_Name);
    return this.http.post<any>(this.competitionsURL,compData)
  }

  getCompany(Company_Id) 
  {
    return this.http.get<any>(`${this.companyURL}/${Company_Id}`)
  }

  getCompetition(Competition_Id)
  {
    return this.http.get<any>(`${this.competitionURL}/${Competition_Id}`)
  }

  getCompetitionsByCompany(Company_Id)
  {
    return this.http.get<any>(`${this.competitionsByCompanyId}/${Company_Id}`)
  }

  getCv(User_email)
  {
    return this.http.get<any>(`${this.cvURL}/${User_email}`)
  }

  editCV(cv){
    return this.http.post<any>(this.editCv, cv);
  }

  saveApply(apply)
  {
    console.log(apply);
    return this.http.post<any>(this.applyURL, apply)
  }

  createCompetition(competition)
  {
    return this.http.post<any>(this.createCompetitonUrl, competition)
  }

  getCompanyByEmail(email)
  {
    return this.http.get<any>(`${this.companyByEmailUrl}/${email}`)
  }

  getMyApplies(email)
  {
    return this.http.get<any>(`${this.myAppliesUrl}/${email}`)
  }

  getAllCompetitions(name:String,type:String){
    //let test = new RegExp(".*"+name+".*");
    const data={
     name:name,
     type:type
   }
   return this.http.post<any>(this.urlOffers,data);
  }

  getAllApplies(){

    return this.http.post<any>(this.urlAllCompetitions,{});
  }

  finishOffer(id:String){
    return this.http.post(this.finishCompURL,{_id:id});
  }

  changeStatusApply(id:String,status:String){
    return this.http.post(this.changeStatusURL,{_id:id,status:status});
  }

  setTimeCompany(from:String,to:String){
    const time={
      from:from,
      to:to
    }
    return this.http.post<any>(this.timeCompanyURL,time);
  }

  setTimeCV(from:String,to:String){
    const time={
      from:from,
      to:to
    }
    return this.http.post<any>(this.timeCVURL,time);
  }

  getTime(type:String){
    return this.http.post<any>(this.justTimeURL,{type:type});
  }

  getCurrentFair(){
    return this.http.post<any>(this.currentFairURL,{});
  }

  addNewFair(fair){
    return this.http.post<any>(this.addFairURL,fair);
  }

  uploadNewImage(image:File){
    const fd = new FormData();
    fd.append("image", image, image.name);
    return this.http.post<any>(this.newImageURL, fd);
  }
  uploadNewFile(new_file:File){
    const data = new FormData();
    data.append("image", new_file, new_file.name);   
    return this.http.post<any>(this.filesURL,data);
  }

  getCompaniesGuest(Company_Name, activity, City) {
    const data = {
      Company_Name:Company_Name,
      Activity:activity,
      City:City
    }

    return this.http.post<any>(this.guestURL,data);
  }
}
