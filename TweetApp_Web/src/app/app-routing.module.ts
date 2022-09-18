import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {path:'',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'userDashboard',component:UserDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
