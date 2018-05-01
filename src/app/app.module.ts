import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ClientService} from './service/client.service';
import {AuthService} from './service/auth.service';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app.routing';
import {AuthGuard} from './service/auth.guard';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {ClientComponent} from './client/client.component';
import {FooterComponent} from './footer/footer.component';
import {AdminComponent} from './admin_section/admin.component';
import {AdminGuard} from './service/admin.guard';
import {RegService} from './service/reg.service';
import {RegComponent} from './register/reg.component';
import {TourSelectionComponent} from './tour_selection/tour.selection.component';
import {TourService} from './service/tour.service';
import {UserComponent} from './admin_section/manage_users/user.component';
import {UserService} from './service/user.service';
import {ClientManageComponent} from './admin_section/manage_clients/client.manage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent,
    AdminComponent,
    RegComponent,
    TourSelectionComponent,
    UserComponent,
    ClientManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ClientService,
    AuthService,
    RegService,
    AuthGuard,
    AdminGuard,
    TourService,
    UserService
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule {
}
