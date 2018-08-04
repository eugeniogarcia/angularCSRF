import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule}    from '@angular/common/http';

//CSRF
//Only in case we want to change the name of the cookie and header
import{HttpClientXsrfModule} from '@angular/common/http';

//Intercept the call
//THe default HttpXsrfInterceptor in '@angular/common/http' skips absolute URLs
//if we need them, implement a custom interceptor and replace the one included in xsrf
import { HttpXsrfInterceptor }      from './hero.interceptor';
//Just in case were not already using interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';


//CSRF

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
//CSRF
    //HttpClientXsrfModule
    HttpClientXsrfModule.withOptions({
       cookieName: 'XSRF-TOKEN', // this is optional
       headerName: 'X-XSRF-TOKEN' // this is optional
     })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],

  //CSRF
  providers:[
    //This is to replace the original HttpXsrfInterceptor, so that the absolute URLs are supported
    HttpXsrfInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
  ],
  //CSRF

  bootstrap: [ AppComponent ]
})
export class AppModule { }
