import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { TweetAppService } from '../tweet-app.service';
import { UserModel } from '../tweet.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private tweetService:TweetAppService) { }

  userToCreate:UserModel=<UserModel>{};
  cPwd!:string;
  profileImg!:Observable<any>;

  ngOnInit(): void {
    console.log(this.userToCreate);
  }

  UserRegister(){
    this.profileImg.subscribe(res=>{this.userToCreate.picture=res
      console.log("hit",this.userToCreate);
    this.tweetService.CreateUser(this.userToCreate).subscribe(res=>
    {
      console.log(res);
      if(res.isSuccess){
        alert("Sucessfully Registered! Please login.")
        this.router.navigateByUrl('');
      }
    });
  });
    
  }

  onChange($event:Event){
    const file = ($event.target as HTMLInputElement).files;
    //console.log(file.length>0?"yes":"no");
    if(file!=null){
      console.log(file[0]);
      this.convertToBase64(file[0]);
      console.log(this.profileImg);
    }
  }

  convertToBase64(file:File)
  {
    this.profileImg=new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber);
    });
    // observable.subscribe((img)=>{
    //   console.log(img);
    //   this.profileImg=img;
    //   console.log(this.profileImg);
    //  });
  }

  readFile(file:File,subscriber:Subscriber<any>){
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }

    fileReader.onerror = (error) =>{
      subscriber.error(error);
      subscriber.complete();
    }
    
  }

  isUniqueLoginId(){
    this.tweetService.IsUniqueLoginId(this.userToCreate.loginId).subscribe(
      res=>{
       if(!res.isSuccess){
        alert("Login Id must be unique! Its already exist");
        this.userToCreate.loginId="";
       }
      }
    )
  }


  isUniqueMail(){
    this.tweetService.IsUniqueEmailId(this.userToCreate.emailId).subscribe(
      res=>{
       if(!res.isSuccess){
        alert("Email Id must be unique! Its already exist");
        this.userToCreate.emailId="";
       }
      }
    )
  }

}
