import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {HttpInterceptorService} from '../../services/http-interceptor.service';
import {SearchUserResultComponent} from '../search-user-result/search-user-result.component';
import {HomeRoutingModule} from './home-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {HeaderComponent} from '../layouts/header/header.component';
import {SearchUsersComponent} from '../search-users/search-users.component';
import {HomeComponent} from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchUsersComponent,
    SearchUserResultComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ]
})
export class HomeModule {
}
