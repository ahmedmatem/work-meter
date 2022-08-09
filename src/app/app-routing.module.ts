import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminHomeComponent } from './admin/admin-home/admin-home.component'
import { AdminComponent } from './admin/admin.component'
import { AuthComponent } from './auth/auth.component'
import { AuthGard } from './auth/auth.gard'
import { HomeComponent } from './home/home.component'
import { Role } from './models/Role'

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGard],
    data: { roles: [Role.Admin, Role.Manager] },
    children: [
      { path: 'home', component: AdminHomeComponent, canActivate: [AuthGard] },
      // { path: 'dayworks', component: DayworksComponent, canActivate: [AuthGard] }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGard] },
  // { path: 'dayworks', component: DayworksComponent, canActivate: [AuthGard] },
  // { path: 'workers', component: WorkersComponent, canActivate: [AuthGard] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
