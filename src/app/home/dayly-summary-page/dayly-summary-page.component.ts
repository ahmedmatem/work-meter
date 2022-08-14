import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/Site';
import { SiteService } from 'src/app/site-list/site.service';

@Component({
  selector: 'app-dayly-summary-page',
  templateUrl: './dayly-summary-page.component.html',
  styleUrls: ['./dayly-summary-page.component.css']
})
export class DaylySummaryPageComponent implements OnInit {
today = new Date()

  private _site: Site | null = null

  constructor(
    private siteService: SiteService,
    private router: Router) { }

  get site(): Site | null {
    return this._site
  }

  showTodaySummary(){
    this.router.navigateByUrl('home/today-summary')
  }

  close(){
    this.router.navigateByUrl('home/sites')
  }

  ngOnInit(): void {
    this._site = this.siteService.selectedSite.getValue()
    if(!this._site){
      this.router.navigate(['home/sites'])
    }
  }

}
