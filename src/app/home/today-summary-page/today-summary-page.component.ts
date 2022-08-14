import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/Site';
import { SiteService } from 'src/app/site-list/site.service';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary-page.component.html',
  styleUrls: ['./today-summary-page.component.css']
})
export class TodaySummaryPageComponent implements OnInit {
  private _site: Site | null

  constructor(
    private siteService: SiteService,
    private router: Router) { 
    this._site = this.siteService.selectedSite.getValue()
    if(!this._site){
      this.router.navigateByUrl('home/sites')
    }
  }

  get site(): Site{
    return this._site!
  }

  showAddWorkPage(){
    this.router.navigateByUrl('home/add-work')
  }

  close(){
    this.router.navigateByUrl('home/dayly-summary')
  }

  ngOnInit(): void {
  }

}
