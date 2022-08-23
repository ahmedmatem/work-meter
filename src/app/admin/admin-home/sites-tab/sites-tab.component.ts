import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { SiteRepository } from 'src/app/data/site/site-repository'
import { Site } from 'src/app/models/Site'

@Component({
  selector: 'app-sites-tab',
  templateUrl: './sites-tab.component.html',
  styleUrls: ['./sites-tab.component.css']
})
export class SitesTabComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  sites: Site[] = this.siteRepo.getAllLocal()

  private siteListChangedSub = new Subscription()
  private siteCreatedSub = new Subscription()

  constructor(private siteRepo: SiteRepository) { }

  ngOnInit(): void {
    // Subscribe on onSiteListChanged event 
    this.siteListChangedSub = this.siteRepo.onSiteListChanged.subscribe({
      next: (sites) => {
        this.sites = sites
      }
    })

    // Subscribe on onSiteCreated event
    this.siteCreatedSub = this.siteRepo.onSiteCreated.subscribe(
      (site) => {
        // Refresh site list with newly created site
        this.sites.push(site)
      }
    )

    this.sites = this.siteRepo.getAllLocal()

    this.siteRepo.download().subscribe({
      next: (sites) => {
        this.sites = sites
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
  
  ngOnDestroy(): void {
    this.siteListChangedSub.unsubscribe()
    this.siteCreatedSub.unsubscribe()
  }
}
