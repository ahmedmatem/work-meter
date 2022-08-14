import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Site } from 'src/app/models/Site'
import { SiteService } from 'src/app/site-list/site.service'
import { SitesPageService } from './sites-page.service'

@Component({
  selector: 'app-site-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.css']
})
export class SitesPageComponent implements OnInit {
  workerSites: Site[] = []
  isLoading = false

  private workerId: string
  private listWorkerSitesSub = new Subscription()

  constructor(
    authService: AuthService,
    private router: Router,
    private siteService: SiteService,
    private sitesPageService: SitesPageService) { 
      this.workerId = authService.user.getValue()?.id!
    }

  ngOnInit(): void {
    this.isLoading = true
    this.listWorkerSitesSub = this.sitesPageService.listSitesByWorker(this.workerId)
    .subscribe(workerSites => {
      this.isLoading = false
      this.workerSites = workerSites
    })
  }

  showDaylySummaryFor(site: Site){
    this.siteService.selectedSite.next(site)
    this.router.navigate(['home/dayly-summary'])
  }

  ngOnDestroy(): void {
    this.listWorkerSitesSub.unsubscribe()
  }

}
