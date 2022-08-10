import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Site } from 'src/app/models/Site'
import { SitesPageService } from './sites-page.service'

@Component({
  selector: 'app-site-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.css']
})
export class SitesPageComponent implements OnInit {

  workerSites: Site[] = []
  isLoading = false

  private workerId: string
  private listWorkerSitesSub = new Subscription()

  constructor(
    private authService: AuthService,
    private sitesPageService: SitesPageService) { 
      this.workerId = this.authService.user.getValue()?.id!
    }

  ngOnInit(): void {
    this.isLoading = true
    this.listWorkerSitesSub = this.sitesPageService.listSitesByWorker(this.workerId)
    .subscribe(workerSites => {
      this.isLoading = false
      this.workerSites = workerSites
    })
  }

  ngOnDestroy(): void {
    this.listWorkerSitesSub.unsubscribe()
  }

}
