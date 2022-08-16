import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbCollapseModule, NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthComponent } from './auth/auth.component'
import { FormsModule } from '@angular/forms'
import { CreateUserComponent } from './users/create-user/create-user.component'
import { LoadingSpinnerComponent } from './share/loading-spinner/loading-spinner.component'
import { AdminComponent } from './admin/admin.component'
import { HeaderComponent } from './header/header.component'
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component'
import { UserHeaderComponent } from './header/user-header/user-header.component'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AdminHomeComponent } from './admin/admin-home/admin-home.component'
import { SiteListComponent } from './site-list/site-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthTokenHttpInterceptor } from './auth/auth-token.interceptor'
import { WorkerListComponent } from './worker-list/worker-list.component'
import { WorkerItemComponent } from './worker-list/worker-item/worker-item.component'
import { SiteItemComponent } from './site-list/site-item/site-item.component'
import { WorkerSettingsComponent } from './worker-list/worker-settings/worker-settings.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { HomeComponent } from './home/home.component'
import { MatCardModule } from '@angular/material/card'
import { SitesTabComponent } from './admin/admin-home/sites-tab/sites-tab.component'
import { NewSiteFormComponent } from './new-site-form/new-site-form.component'
import { SitesPageComponent } from './home/sites-page/sites-page.component'
import { DaylySummaryPageComponent } from './home/dayly-summary-page/dayly-summary-page.component'
import { TodaySummaryPageComponent } from './home/today-summary-page/today-summary-page.component'
import { AddWorkPageComponent } from './home/add-work-page/add-work-page.component'
import { WorkFormComponent } from './work-form/work-form.component'
import { CameraComponent } from './camera/camera.component'
import { WebcamModule } from 'ngx-webcam'
import { AuthService } from './auth/auth.service'
import { SiteLocalStorage } from './data/site/site.local-storage'
import { SiteRemoteStorage } from './data/site/site.remote-storage'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateUserComponent,
    LoadingSpinnerComponent,
    AdminComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    HeaderComponent,
    AdminHomeComponent,
    SiteListComponent,
    SiteItemComponent,
    WorkerListComponent,
    WorkerItemComponent,
    WorkerSettingsComponent,
    HomeComponent,
    SitesTabComponent,
    NewSiteFormComponent,
    SitesPageComponent,
    DaylySummaryPageComponent,
    TodaySummaryPageComponent,
    AddWorkPageComponent,
    WorkFormComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgbModalModule,
    NgbNavModule,
    NgbCollapseModule,
    DragDropModule,
    WebcamModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenHttpInterceptor, multi: true },
    { provide: 'SITE_LOCAL_STORAGE', 
      useFactory: (authService: AuthService) => {
        return new SiteLocalStorage(authService)
      },
      deps: [AuthService]
    },
    { provide: 'SITE_REMOTE_STORAGE', 
      useFactory: (authService: AuthService, http: HttpClient) => {
        return new SiteRemoteStorage(authService, http)
      },
      deps: [AuthService, HttpClient]
  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
