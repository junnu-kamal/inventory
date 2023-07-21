import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { API_END_POINT } from '../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm =  new FormGroup({
    'username' : new FormControl('',[Validators.required]),
    'password' : new FormControl('',[Validators.required])
  });

  constructor(private _http : HttpClient, private router : Router){}

  ngOnInit(): void {
    let token = localStorage.getItem('access');
    if(token){
      this._http.post(API_END_POINT + "auth/jwt/verify/", {'token' : token}).subscribe({
        next : (response : any)=>{
          this.router.navigate(['/home']);
        },
        error : (error)=>{
          localStorage.clear();
        }
      })
    }
  }

  login(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this._http.post(API_END_POINT + "auth/jwt/create/", this.loginForm.value).subscribe({
        next : (response : any)=>{
          localStorage.setItem('access',response['access']);
          localStorage.setItem('refresh',response['refresh']);
          this.router.navigate(['/home']);
        },
        error : (error)=>{
          alert("Invalid credentials");
        }
      })
    }
  }
}
