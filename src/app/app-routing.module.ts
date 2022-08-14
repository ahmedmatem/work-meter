import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminHomeComponent } from './admin/admin-home/admin-home.component'
import { AdminComponent } from './admin/admin.component'
import { AuthComponent } from './auth/auth.component'
import { AuthGard } from './auth/auth.gard'
import { CameraComponent } from './camera/camera.component'
import { AddWorkPageComponent } from './home/add-work-page/add-work-page.component'
import { DaylySummaryPageComponent } from './home/dayly-summary-page/dayly-summary-page.component'
import { HomeComponent } from './home/home.component'
import { SitesPageComponent } from './home/sites-page/sites-page.component'
import { TodaySummaryPageComponent } from './home/today-summary-page/today-summary-page.component'
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
  { path: 'home', redirectTo: '/home/sites', pathMatch: 'full' },
  { 
    path: 'home',
     component: HomeComponent,
     canActivate: [AuthGard],
     children: [
      { path: 'sites', component: SitesPageComponent, canActivate: [AuthGard]},
      { path: 'dayly-summary', component: DaylySummaryPageComponent, canActivate: [AuthGard]},
      { path: 'today-summary', component: TodaySummaryPageComponent, canActivate: [AuthGard]},
      { path: 'add-work', component: AddWorkPageComponent, canActivate: [AuthGard]}
     ]
  },
  { path: 'camera', component: CameraComponent, canActivate: [AuthGard] },
  // { path: 'dayworks', component: DayworksComponent, canActivate: [AuthGard] },
  // { path: 'workers', component: WorkersComponent, canActivate: [AuthGard] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
