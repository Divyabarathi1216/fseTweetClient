import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { TweetAppService } from '../tweet-app.service';
import { UserDisplayModel, UserModel } from '../tweet.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private tweetService:TweetAppService) { }

  @Input() userToCreate:UserDisplayModel=<UserDisplayModel>{};
  @Output() showEvent=new EventEmitter<boolean>();
  //isUpdate=false;
  cPwd!:string;
  profileImg!:Observable<any>;

  ngOnInit(): void {
    this.cPwd=this.userToCreate.password;
    console.log(this.userToCreate);
  }

  showDashboard(value:boolean){
    this.showEvent.emit(value);
  }

  Update(){
    
    console.log("hit",this.userToCreate);
    this.tweetService.UpdateUser(this.userToCreate).subscribe(res=>
    {
      console.log(res);
      if(res.isSuccess){
        this.showDashboard(true);
        alert("Sucessfully Updated! Please login.");
        this.router.navigateByUrl('');
      }
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
    this.profileImg.subscribe(res=>(this.userToCreate.picture=res));
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


}
