import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Site } from 'src/app/models/Site'
import { SiteService } from 'src/app/site-list/site.service'

@Component({
  selector: 'app-add-work-page',
  templateUrl: './add-work-page.component.html',
  styleUrls: ['./add-work-page.component.css']
})
export class AddWorkPageComponent implements OnInit {
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

  close(){
    this.router.navigateByUrl('home/today-summary')
  }

  ngOnInit(): void {
  }

}
