import { Component, OnInit } from '@angular/core'
import { SiteRepository } from 'src/app/data/site/site-repository'
import { Site } from 'src/app/models/Site'

@Component({
  selector: 'app-sites-tab',
  templateUrl: './sites-tab.component.html',
  styleUrls: ['./sites-tab.component.css']
})
export class SitesTabComponent implements OnInit {
  isLoading: boolean = true
  sites: Site[] = []

  constructor(private siteRepo: SiteRepository) { }

  ngOnInit(): void {
    this.siteRepo.getAll().subscribe((sites) => {
      this.isLoading = false
      this.sites = sites
    })
  }
}
