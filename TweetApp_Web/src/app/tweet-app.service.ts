import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { catchError, map, Observable, observable, throwError } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { LikeModel, PasswordModel, ReplyTweetModel, TweetModel, UserDisplayModel, UserModel } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetAppService {

 // userAPIPath="https://localhost:44321/api/v1.0/Tweets/users/";
 // tweetAPIPath="https://localhost:44321/api/v1.0/Tweets/";

 userAPIPath="https://tweetappapi20220917205627.azurewebsites.net/api/v1.0/Tweets/users";
 tweetAPIPath="https://tweetappapi20220917205627.azurewebsites.net/api/v1.0/Tweets/";

  constructor(private http:HttpClient){}

  //--------------------------------- User services ------------------------------------//
  AuthenticateUser(loginId:string,password:string):Observable<any>
  {
      return this.http.get(this.userAPIPath+"login/"+loginId+","+password);
  }

  GetUserById(loginId:string):Observable<any>
  {
      let token=sessionStorage.getItem("tokenVal");
      console.log(token);
      let headers = new HttpHeaders().set("Authorization","Bearer "+token);
      return this.http.get(this.userAPIPath+"search/"+loginId,{'headers':headers});
  }

  GetAllUsers():Observable<any>
  {
      let token=sessionStorage.getItem("tokenVal");
      let headers = new HttpHeaders().set("Authorization","Bearer "+token);
      return this.http.get(this.userAPIPath+"all",{'headers':headers});
  }

   ForgotPassword(changePwd:PasswordModel):Observable<any>
   {
     //let token=sessionStorage.getItem("tokenVal");
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.patch(this.userAPIPath+"forgot",changePwd,{'headers':headers});
   }

  CreateUser(userToInsert:UserModel):Observable<any>
  {
      let headers = new HttpHeaders().set('Content-Type','application/json');
      console.log("service",userToInsert.picture);
      console.log(this.userAPIPath+"register")
      return this.http.post(this.userAPIPath+"register",userToInsert,{'headers':headers});
  }

  UpdateUser(userToUpdate:UserDisplayModel):Observable<any>
  {
     let token=sessionStorage.getItem("tokenVal");
     let headers = new HttpHeaders().set("Authorization","Bearer "+token).set('Content-Type','application/json');
     console.log("service",userToUpdate);
     console.log(this.userAPIPath+"update")
     return this.http.put(this.userAPIPath+"update",userToUpdate,{'headers':headers});
  }
  

  IsUniqueLoginId(loginId:string):Observable<any>
  {
    console.log("unique login id");
    return this.http.get(this.userAPIPath+"Isuniqueid/"+loginId);
  }

  IsUniqueEmailId(emailId:string):Observable<any>
  {
    return this.http.get(this.userAPIPath+"Isuniqueemail/"+emailId);
  }


  //--------------------------------- Tweet services ------------------------------------//
  ViewAllTweets():Observable<any>
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.get(this.tweetAPIPath+"all",{'headers':headers})
  }

  ViewTweetsByUser(loginId:string):Observable<any>
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.get(this.tweetAPIPath+loginId,{'headers':headers})
  }

  DeleteTweet(tweetId:number):Observable<any>
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.delete(this.tweetAPIPath+"delete/"+tweetId,{'headers':headers})
  }

  CreateTweet(tweet:TweetModel)
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token).set('Content-Type','application/json');
    console.log("service",tweet);
    console.log(this.tweetAPIPath+"add")
    return this.http.post(this.tweetAPIPath+"add",tweet,{'headers':headers});
  }

  UpdateTweet(tweetToUpdate:TweetModel)
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token).set('Content-Type','application/json');
    console.log("service",tweetToUpdate);
    console.log(this.tweetAPIPath+"add")
    return this.http.put(this.tweetAPIPath+"update",tweetToUpdate,{'headers':headers});
  }

  LikeTweet(like:LikeModel)
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token).set('Content-Type','application/json');
    console.log("service",like);
    console.log(this.tweetAPIPath+"add")
    return this.http.post(this.tweetAPIPath+"like",like,{'headers':headers});
  }

  ReplyTweet(reply:ReplyTweetModel)
  {
    let token=sessionStorage.getItem("tokenVal");
    let headers = new HttpHeaders().set("Authorization","Bearer "+token).set('Content-Type','application/json');
    console.log("service",reply);
    console.log(this.tweetAPIPath+"add")
    return this.http.post(this.tweetAPIPath+"reply",reply,{'headers':headers});
  }


}
