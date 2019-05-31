import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  correctPassword:Boolean = true
  registerUserData = {}
  apply_image : File;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() 
  {

    this.auth.registerUser(this.registerUserData)
    .subscribe(
      response => {
        this.auth.uploadNewImage(this.apply_image).subscribe(()=>{
          console.log("uspeh");
        });
        console.log(response)
        this.router.navigate(["/login"])
      },
      error => console.log(error)
    )
  }

  checkPassword(password):Boolean
  {
    if(password.length > 0)
    {
      let correct:Boolean = (this.checkLength(password) 
              && this.checkUpperCase(password) 
              && this.checkLowCase(password) 
              && this.checkNumber(password)
              && this.checkSpecialCharacters(password)
              && this.checkFirstLetter(password)
              && this.checkLettersInaRow(password))
      console.log(correct)
      if(correct)
        this.correctPassword = true
      else
        this.correctPassword = false      
      return correct
    }
    else
    {
      this.correctPassword = true
      return true
    }
  }

  checkLength(password):Boolean
  {
    if(password.length >= 8 && password.length <= 12) 
      return true
    else
      return false
  }

  checkUpperCase(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(password[i] == password[i].toUpperCase())
        count++
    }

    if(count >= 1)
      return true
    else
      return false
  }

  checkLowCase(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(password[i] == password[i].toLowerCase())
        count++
    }
    
    if(count >= 3)
      return true
    else
      return false
  }

  checkNumber(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(isNaN(password[i]))
        count++
    }
    
    if(count >= 1)
      return true
    else
      return false
  }

  checkSpecialCharacters(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if((password[i] == '#') 
        || (password[i] == '*') 
        || (password[i] == '.') 
        || (password[i] == '!') 
        || (password[i] == '?') 
        || (password[i] == '$'))
        count++
    }
    
    if(count >= 1)
      return true
    else
      return false
  }

  checkFirstLetter(password):Boolean
  {
    return password[0].match(/[a-zA-Z]/)
  }

  checkLettersInaRow(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length-1; i++)
    {
      if(password[i] == password[i + 1])
        return false
    }
    return true
  }

  insertImage(event) {
    this.apply_image = event.target.files[0];
 
    var file, img;
    if ((file = event.target.files[0])) {
        img = new Image();
        
        img.onload = function () {          
            
        };
        img.src = URL.createObjectURL(file);
    }
  }
}
