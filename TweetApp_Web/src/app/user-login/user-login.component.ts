import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetAppService } from '../tweet-app.service';
import { PasswordModel } from '../tweet.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  showForgotPwd=false;
  loginId!: string;
  password!: string;
  conPwd!: string;
  constructor(private tweetService:TweetAppService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  enableForgotPwd(){
    this.showForgotPwd=true;
  }
  moveToLogin(){
    this.showForgotPwd=false;
  }
  
  UserLogin(){
    console.log("hit");
    this.tweetService.AuthenticateUser(this.loginId,this.password).subscribe(result=>
      {
        console.log(result);
        
        console.log(result);
        if(result.isSuccess)
        {
          sessionStorage.setItem("tokenVal",result.result.token);
          var userLogged=this.tweetService.GetUserById(this.loginId).subscribe(res=>{
            console.log("result",res);
            sessionStorage.setItem("loggedUser",JSON.stringify(res.result));
            console.log(sessionStorage.getItem("loggedUser"));
            this.router.navigateByUrl('userDashboard');
          });
        }
        else
        {
          this.loginId="";
          this.password="";
          window.location.reload();
          alert("Invalid Credentials");        
        }
      });
  }

  forgotPwd(){
    let newPassModel:PasswordModel=<PasswordModel>{};
    newPassModel.password=this.password;
    newPassModel.userId=this.loginId;
        this.tweetService.ForgotPassword(newPassModel).subscribe(result=>{
          if(result.isSuccess){
            this.showForgotPwd=false;
            this.password="";
            alert("Password changed! Please login using your new password.");
          }
          else{
            this.showForgotPwd=false;
            alert("Something went wrong! Try again.");
          }
        });
  }

  isLoginIdExist()
  {
    this.tweetService.IsUniqueLoginId(this.loginId).subscribe(res=>{
      if(res.isSuccess){
        this.loginId="";
        alert("Invalid login Id");
      }
    });
  }

  IsPwdAndCpwdSame()
  {
    if(this.password!=this.conPwd){
      this.conPwd="";
      alert("Password and confirm password should be same");
    }
  }
}
