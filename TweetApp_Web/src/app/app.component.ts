import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweetApp_Web';

  isShow=true;
  showHide(event:any){
    if(event instanceof AppComponent){
      this.isShow=true;
    }
    else{
      this.isShow=false;
    }
  }
}
