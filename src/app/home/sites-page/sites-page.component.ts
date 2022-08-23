import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Site } from 'src/app/models/Site'
import { HomeService } from '../home.service'

@Component({
  selector: 'app-sites-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.css']
})
export class SitesPageComponent implements OnInit {
  workerSites: Site[] = []

  private workerSitesChangedSub = new Subscription()

  constructor(
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {
    this.workerSites = this.homeService.workerSites
    this.workerSitesChangedSub = this.homeService.siteListChangedSubject.subscribe({
      next: (sites) => {
        this.workerSites = sites
      }
    })
  }

  showDaylySummaryFor(site: Site){
    // this.siteService.selectedSite.next(site)
    // this.router.navigate(['home/dayly-summary'])
  }

  ngOnDestroy(): void {
    this.workerSitesChangedSub.unsubscribe()
  }

}
