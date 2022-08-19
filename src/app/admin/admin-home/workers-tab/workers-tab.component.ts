import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { WorkerRepository } from 'src/app/data/worker/worker-repository'
import { Worker } from 'src/app/models/Worker'

@Component({
  selector: 'app-workers-tab',
  templateUrl: './workers-tab.component.html',
  styleUrls: ['./workers-tab.component.css']
})
export class WorkersTabComponent implements OnInit, OnDestroy {
  isLoading = false
  workers: Worker[] = []
  selectedWorker: Worker | undefined
  isPageList = true
  isPageSettings = false

  private onWorkerListChangedSub = new Subscription()

  constructor(private workerRepo: WorkerRepository) { }

  ngOnInit(): void {
    this.onWorkerListChangedSub = this.workerRepo.onWorkerListChanged.subscribe((workers) => {
      this.isLoading = false
      this.workers = workers
    })

    this.workers = this.workerRepo.workers
    if(this.workers.length === 0){
      this.isLoading = true
      this.workerRepo.downloadWorkers()
    }
  }

  settings(worker: Worker){
    this.selectedWorker = worker
    this.isPageList = false
    this.isPageSettings = true
  }

  closeSettings(){
    this.isPageSettings = false
    this.isPageList = true
  }

  ngOnDestroy(): void {
    this.onWorkerListChangedSub.unsubscribe()
  }
}
