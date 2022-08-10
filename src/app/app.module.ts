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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
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
import { MatCardModule } from '@angular/material/card';
import { SiteHistoryComponent } from './site-list/site-history/site-history.component';
import { SitesTabComponent } from './admin/admin-home/sites-tab/sites-tab.component';
import { NewSiteFormComponent } from './new-site-form/new-site-form.component'

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
    SiteHistoryComponent,
    SitesTabComponent,
    NewSiteFormComponent
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
