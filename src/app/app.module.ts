import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoginPageModule} from './login-page/login-page.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageModule} from './dashboard-page/dashboard-page.module';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {NeedAuthGuard} from './auth.guard';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular4-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarModule } from './side-bar/side-bar.module';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { StocksComponent } from './stocks/stocks.component';


const google_oauth_client_id:string = '351246264386-jf6d99n4g6ofkq66u7iq7oer94qbgheo.apps.googleusercontent.com';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
      path: 'profile',
      component: ProfileComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'stocks',
        component: StocksComponent
      },

];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ProfileComponent,
    PaymentComponent,
    StocksComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    LoginPageModule,
    DashboardPageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule.initialize(config),
    SideBarModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NeedAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
