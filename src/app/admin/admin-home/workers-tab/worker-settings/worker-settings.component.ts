import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { forkJoin, Subscription } from 'rxjs'
import { SiteRepository } from 'src/app/data/site/site-repository'
import { Site } from 'src/app/models/Site'
import { Worker } from 'src/app/models/Worker'

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
  
  private forkSitesSub = new Subscription()

  constructor(
    private siteRepo: SiteRepository
  ) { }

  ngOnInit(): void {    
    // if(this.siteRepo.sites.length > 0){
    //   this.separateSites(this.siteRepo.sites)
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

    // if(this.siteRepo.sites.length === 0){
    //   this.allSitesSub = this.siteService.list()
    //   .subscribe({
    //     next: (allSites) => {
    //       this.workerSitesSub = this.siteRepo.downloadWorkerSites(this.worker.id)
    //       .subscribe(siteIds => {
    //         this.separateSites(allSites, siteIds)
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
    this.siteRepo.setWorkerSites(this.worker.id, visitedSiteIds)
    .subscribe({
      complete: () => {
        console.log('Worker sites was saved successfully.')
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
    this.forkSitesSub = forkJoin([
      this.siteRepo.downloadSitesAsObservable(), // request all sites
      this.siteRepo.downloadWorkerSitesAsObservable(this.worker.id) // request worker site's ids
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
    this.forkSitesSub.unsubscribe()
  }
}
