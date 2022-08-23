import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Site } from 'src/app/models/Site'
import { HomeService } from '../home.service'

@Component({
  selector: 'app-add-work-page',
  templateUrl: './add-work-page.component.html',
  styleUrls: ['./add-work-page.component.css']
})
export class AddWorkPageComponent implements OnInit {
  site: Site | undefined

  constructor(
    private homeService: HomeService,
    private router: Router) { }

  close(){
    this.router.navigateByUrl('home/today-summary')
  }

  ngOnInit(): void {
    if(!this.homeService.selectedSite.value){
      this.router.navigateByUrl('home/sites')
    }

    this.site = this.homeService.selectedSite.value!
  }

}
