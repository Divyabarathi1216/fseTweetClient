import { Byte } from "@angular/compiler/src/util";

export interface UserModel {
    firstName: string;
    lastName:  string;
    emailId:   string;
    contactNo: number;
    loginId:   string;
    password:  string;
    picture:   string;
}

export interface UserDisplayModel {
    id:number;
    firstName: string;
    lastName:  string;
    emailId:   string;
    contactNo: number;
    loginId:   string;
    password:  string;
    picture:   string;
    userLastSeen:string;
    isActive:boolean;
}

export interface TweetModel{
    userId:number;
    tweet:string;
    tag:string;
}

export interface TweetDisplayModel{
    id:number;
    userId:number;
    user:UserDisplayModel;
    tweet:string;
    tag:string;
    replyTweets:ReplyTweetDisplayModel[];
    likeCnt:number;
    dislikeCnt:number;
    tweetCreatedDate:Date;
    isShowReply:boolean;
}

export interface ReplyTweetModel{
    replyTweet:string;
    tag:string;
    tweetId:number;
    userId:number;
}

export interface ReplyTweetDisplayModel{
    id:number;
    replyTweet:string;
    tag:string;
    tweetId:number;
    userId:number;
    user:UserDisplayModel;
    replyTweetCreatedDate:Date;
}

export interface PasswordModel{
    userId:string;
    password:string;
}

export interface LikeModel{
    tweetId:number;
    isLike:boolean;
}