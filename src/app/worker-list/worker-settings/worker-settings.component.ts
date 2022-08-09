import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { forkJoin, Subscription } from 'rxjs'
import { Site } from 'src/app/models/Site'
import { Worker } from 'src/app/models/Worker'
import { SiteService } from 'src/app/site-list/site.service'
import { WorkerService } from '../worker.service'

@Component({
  selector: 'app-worker-settings',
  templateUrl: './worker-settings.component.html',
  styleUrls: ['./worker-settings.component.css']
})
export class WorkerSettingsComponent implements OnInit, OnDestroy {
  @Input('worker') worker!: Worker
  @Output() closeEvent = new EventEmitter<void>()

  isVisitedSiteListChanged = false
  visitedSiteList: Site[] = []
  /**
   * availableSiteList property contains all sites excluded visited ones
   */
  availableSiteList: Site[] = []
  isLoading = false
  
  private allSitesSub = new Subscription()
  private workerSitesSub = new Subscription()

  constructor(
    private siteService: SiteService,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {    
    // if(this.siteService.sites.length > 0){
    //   this.separateSites(this.siteService.sites)
    // } else {
    //   this.allSitesSub = this.siteService.list()
    //   .subscribe({
    //     next: (allSites) => {
    //       this.workerSitesSub = this.workerService.getSitesByWorker(this.worker.id)
    //       .subscribe(workerSitesIds => {
    //         this.separateSites(allSites, workerSitesIds)
    //       })
    //     }
    //   })
    // }

    this.separateSites()
    
  }

  save(){
    this.isVisitedSiteListChanged = false
    const visitedSiteIds = this.visitedSiteList.map(site => {
      return site.id!
    })
    this.workerService.setSitesByWorker(this.worker.id, visitedSiteIds)
    .subscribe({
      complete: () => {
        // console.log('Worker site ids was saved successfully.')
      }
    })
  }

  close(){
    this.closeEvent.next()
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
      this.isVisitedSiteListChanged = true
    }
  }

  private separateSites(){
    this.isLoading = true
    forkJoin([
      this.siteService.list(), // request all sites
      this.workerService.getSitesByWorker(this.worker.id) // request worker site's ids
    ]).subscribe({
      next: (resData) => {
        const allSites = resData[0]
        const workerSiteIds = resData[1]
        if(allSites){
          if(workerSiteIds){
            this.availableSiteList = allSites.filter(site => {
              return !workerSiteIds.includes(site.id!)
            })
            this.visitedSiteList = allSites.filter(site => {
              return workerSiteIds.includes(site.id!)
            })
          } else {
            this.availableSiteList = allSites
          }
        }
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  ngOnDestroy(): void {
    this.allSitesSub.unsubscribe()
    this.workerSitesSub.unsubscribe
  }
}
