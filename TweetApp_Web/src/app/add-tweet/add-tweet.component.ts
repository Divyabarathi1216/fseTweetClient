import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TweetAppService } from '../tweet-app.service';
import { ReplyTweetModel, TweetModel } from '../tweet.model';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router, private tweetService:TweetAppService) { }

  @Input() userId!:number;
  @Input() tweet:any;
  @Input() replyTweet!:boolean;
  @Output() showEvent=new EventEmitter<boolean>();
  replyModel:ReplyTweetModel=<ReplyTweetModel>{};
  isUpdate=false;
  isReply=false;

  ngOnInit(): void 
  {
    console.log(this.userId);
    if(!this.replyTweet && this.tweet!=null && JSON.stringify(this.tweet) != '{}' )
    {
      console.log(this.tweet);
      this.isUpdate=true;
    }
    if(this.replyTweet && this.tweet!=null && JSON.stringify(this.tweet) != '{}')
    {
      console.log(this.tweet);
      this.replyModel.tweetId=this.tweet.id;
      this.replyModel.userId=this.userId;
      console.log("reply",this.replyModel);
      this.isReply=true;
    }
  }


  post(){
    if(!this.isUpdate){
      this.tweet.userId=this.userId;
      this.tweetService.CreateTweet(this.tweet).subscribe(
        result=>{
          console.log(result);
          //if(result.isSuccess)
          this.showDashboard(true);
        })
    }
    else
    {
      this.tweetService.UpdateTweet(this.tweet).subscribe(
        result=>{
          console.log(result);
          //if(result.isSuccess)
          this.showDashboard(true);
        }
      )
    }  
  }

  showDashboard(value:boolean)
  {
    this.showEvent.emit(value);
  }

  reply()
  {
    console.log("reply hit");
  }
}
