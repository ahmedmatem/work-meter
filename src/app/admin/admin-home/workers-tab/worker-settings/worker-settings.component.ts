import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { forkJoin, Subscription } from 'rxjs'
import { SiteRepository } from 'src/app/data/site/site-repository'
import { WorkerRepository } from 'src/app/data/worker/worker-repository'
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
  isLoading = false

  visitedSiteList: Site[] = []
  unvisitedSiteList: Site[] = []
  
  private forkSitesSub = new Subscription()

  constructor(
    private siteRepo: SiteRepository,
    private workerRepo: WorkerRepository
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
    this.workerRepo.updateWorkerSites(this.worker.id, this.visitedSiteList).subscribe({
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

    const sources = [
      this.siteRepo.download(), // request all sites
      this.workerRepo.downloadWorkerSites(this.worker.id) // request worker sites
    ]

    this.forkSitesSub = forkJoin(sources).subscribe({
      next: (resData) => {
        const allSites = resData[0]
        this.visitedSiteList = resData[1] ? resData[1] : [] // worker sites
        if(allSites){
          this.unvisitedSiteList = []
          for(let i = 0; i < allSites.length; i++){
            let isVisited = false
            for(let j = 0; j < this.visitedSiteList?.length; j++){
              if(this.visitedSiteList[j].id === allSites[i].id){
                isVisited = true
                break
              }
            }
            if(!isVisited){
              this.unvisitedSiteList.push(allSites[i])
            }
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
