import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Site } from 'src/app/models/Site'
import { HomeService } from '../home.service'

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary-page.component.html',
  styleUrls: ['./today-summary-page.component.css']
})
export class TodaySummaryPageComponent implements OnInit {
  site: Site | undefined

  constructor(
    private homeService: HomeService,
    private router: Router) { }

  showAddWorkPage(){
    this.router.navigateByUrl('home/add-work')
  }

  close(){
    this.router.navigateByUrl('home/dayly-summary')
  }

  ngOnInit(): void {
    if(!this.homeService.selectedSite.value){
      this.router.navigateByUrl('home/sites')
    }
    
    this.site = this.homeService.selectedSite.value!
  }

}
