import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetAppService } from '../tweet-app.service';
import { LikeModel, PasswordModel, ReplyTweetModel, TweetDisplayModel, TweetModel, UserDisplayModel, UserModel } from '../tweet.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  loggedUser:UserDisplayModel=<UserDisplayModel>{};
  myTweets:TweetDisplayModel[]=[];
  allTweets:TweetDisplayModel[]=[];
  addTweet={};
  allUsers:UserDisplayModel=<UserDisplayModel>{};  
  isMyTweet=true;
  isAllTweets=false;
  isEditProfile=false;
  isAddTweet=false;
  isShowEmpty=false;
  msg="";
  passModel:PasswordModel=<PasswordModel>{};
  cPwd!:string;
  isReply=false;
  replyModel:ReplyTweetModel=<ReplyTweetModel>{};
  constructor(private route:ActivatedRoute,private router:Router, private tweetService:TweetAppService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("loggedUser"));
    let obj1=sessionStorage.getItem("loggedUser");
    if(obj1==null)
    {
      obj1="{'name':'test'}";
    }
    if(obj1!=="{'name':'test'}")
    {
      this.loggedUser=JSON.parse(obj1);
      console.log("hit",this.loggedUser);
      this.GetUserTweet();
    }
    else{
      this.sessionExpired();
    }
    
    
  }


  GetUserTweet(){
    this.isMyTweet=true;
    this.isAddTweet=false;
    this.isEditProfile=false;
    this.isAllTweets=false;
    this.tweetService.ViewTweetsByUser(this.loggedUser.loginId).subscribe(
      result=>{
        if(result.isSuccess==true){
          this.myTweets=result.result;
          console.log("tweets",result);
          console.log(this.myTweets);
          for(let item of this.myTweets){
            item.isShowReply=false;
          }
        }
        else{
          this.isShowEmpty=true;
        }
       
        
    });
  }

  GetAllTweets(){
    this.isAllTweets=false;
    this.isMyTweet=false;
    this.isAddTweet=false;
    this.isEditProfile=false;
    this.isAllTweets=true;
    this.allTweets=[];
    console.log("empty");
    this.tweetService.ViewAllTweets().subscribe(res=>{
      if(res.isSuccess){
        let tweets:TweetDisplayModel[]=[];
        tweets=res.result;
        this.allTweets=tweets.filter(tweet => tweet.user.id != this.loggedUser.id);
      }
    });
  }

  AddTweet(){
    this.isAddTweet=true;
    this.isAllTweets=false;
    this.isEditProfile=false;
    this.isMyTweet=false;
    this.addTweet={};
  }

  showReply(item:TweetDisplayModel){
    item.isShowReply=true;
  }

  hideReply(item:TweetDisplayModel){
    item.isShowReply=false;
  }

  updateTweet(tweetToUpdate:TweetDisplayModel){
   this.addTweet=tweetToUpdate;
   this.isAddTweet=true;
   this.isAllTweets=false;
   this.isEditProfile=false;
   this.isMyTweet=false;
  }

  EditProfile(){
   this.isAddTweet=false;
   this.isAllTweets=false;
   this.isEditProfile=true;
   this.isMyTweet=false;
  }

  ResetPassword(){
   this.passModel.userId=this.loggedUser.loginId;
   this.tweetService.ForgotPassword(this.passModel).subscribe(result=>{
    if(result.isSuccess){
      alert("New password created! Please login.");
      this.router.navigateByUrl('');
    }
    else{
      alert("Something went wrong. Try again.");
    }
   });
  }

  deleteTweet(tweetId:number)
  {
    this.tweetService.DeleteTweet(tweetId).subscribe(result=>{
      if(result.isSuccess){
        alert("Tweet Deleted");
        this.GetUserTweet();
      }
    });
  }

  logout()
  {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  sessionExpired()
  {
    alert("session expired! Please login again");
    this.router.navigateByUrl('');
  }

  showEvent(item:boolean)
  {
    this.isMyTweet=true;
    this.isAddTweet=false;
    this.GetUserTweet();
    window.location.reload();
  }

  checkPwdCPwd()
  {
    if(this.passModel.password!=this.cPwd){
      alert("New password and confirm password should be same.");
      this.cPwd="";
    }
  }

  likeTweet(tweet:TweetDisplayModel)
  {
    let like:LikeModel=<LikeModel>{};
    like.tweetId=tweet.id;
    like.isLike=true;

    this.tweetService.LikeTweet(like).subscribe(
      res => {
      console.log(res);
      alert("Tweet liked");
    });
   this.allTweets=[];
  // window.location.reload(); 
   this.GetAllTweets();
  
  }

  replyToTweet(item:TweetDisplayModel)
  {
      this.isReply=true;
      this.replyModel.userId=this.loggedUser.id;
      this.replyModel.tweetId=item.id;
  }

  reply()
  {
    this.tweetService.ReplyTweet(this.replyModel).subscribe(res=>{
    console.log(res);
    });
    alert("Reply added!");
    this.isReply=false;
    this.GetAllTweets();
  }
}
