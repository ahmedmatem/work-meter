import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Site } from '../models/Site'
import { HomeService } from './home.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  workerSites: Site[] = []
  isLoading = false

  private workerId: string
  private listWorkerSitesSub = new Subscription()

  constructor(
    private authService: AuthService,
    private homeService: HomeService) { 
      this.workerId = this.authService.user.getValue()?.id!
    }

  ngOnInit(): void {
    this.isLoading = true
    this.listWorkerSitesSub = this.homeService.listSitesByWorker(this.workerId)
    .subscribe(workerSites => {
      this.isLoading = false
      this.workerSites = workerSites
    })
  }

  ngOnDestroy(): void {
    this.listWorkerSitesSub.unsubscribe()
  }
}
