import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {HomeComponent} from './home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/:login', component: UserDetailsComponent, data: { animation: 'UserDetailPage' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
