import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './service/auth.guard';
import {HomeComponent} from './home/home.component';
import {ClientComponent} from './client/client.component';
import {AdminComponent} from './admin_section/admin.component';
import {AdminGuard} from './service/admin.guard';
import {RegComponent} from './register/reg.component';
import {TourSelectionComponent} from './tour_selection/tour.selection.component';
import {UserComponent} from './admin_section/manage_users/user.component';
import {ClientManageComponent} from './admin_section/manage_clients/client.manage.component';
import {ClientOrderComponent} from './client/orders/client.order.component';
import {ClientProfileComponent} from './client/profile/client.profile.component';
import {ClientDataComponent} from './client/personal_data/client.data.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegComponent},
  {path: 'select', component: TourSelectionComponent},
  {
    path: 'room', component: ClientComponent, canActivate: [AuthGuard], children: [
      {path: 'orders', component: ClientOrderComponent},
      {path: 'profile', component: ClientProfileComponent},
      {path: 'personal', component: ClientDataComponent}
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      {path: 'user', component: UserComponent},
      {path: 'client', component: ClientManageComponent}
    ]
  },
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
