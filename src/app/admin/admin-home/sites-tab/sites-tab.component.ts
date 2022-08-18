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
  isLoading: boolean = false
  sites: Site[] = []
  private siteListChangedSub = new Subscription()
  private siteCreatedSub = new Subscription()

  constructor(private siteRepo: SiteRepository) { }

  ngOnInit(): void {    
    // Subscribe on onSiteListChanged event 
    this.siteListChangedSub = this.siteRepo.onSiteListChanged.subscribe((sites) => {
      this.isLoading = false
      this.sites = sites
    })

    // Subscribe on onSiteCreated event
    this.siteCreatedSub = this.siteRepo.onSiteCreated.subscribe(
      (site) => {
        // Refresh site list with newly created site
        this.sites.push(site)
      }
    )
    
    // Load Sites from memmory
    this.sites = this.siteRepo.sites
    if(this.sites.length === 0){
      // Load Sites from remote
      this.isLoading = true
      this.siteRepo.downloadSites()
    }
  }
  
  ngOnDestroy(): void {
    this.siteListChangedSub.unsubscribe()
    this.siteCreatedSub.unsubscribe()
  }
}
