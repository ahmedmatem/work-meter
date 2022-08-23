import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Site } from 'src/app/models/Site'
import { HomeService } from '../home.service'

@Component({
  selector: 'app-dayly-summary-page',
  templateUrl: './dayly-summary-page.component.html',
  styleUrls: ['./dayly-summary-page.component.css']
})
export class DaylySummaryPageComponent implements OnInit {
today = new Date()

  site: Site | undefined

  constructor(
    private homeService: HomeService,
    private router: Router) { }

  showTodaySummary(){
    this.router.navigateByUrl('home/today-summary')
  }

  close(){
    this.router.navigateByUrl('home/sites')
  }

  ngOnInit(): void {
    if(!this.homeService.selectedSite.value){
      this.router.navigate(['home/sites'])
    }

    this.site = this.homeService.selectedSite.value!
  }

}
