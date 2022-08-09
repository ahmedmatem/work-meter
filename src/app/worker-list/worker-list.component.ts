import { Component, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { Worker } from '../models/Worker'
import { WorkerService } from './worker.service'

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit, OnDestroy {
  workers: Worker[] = []
  isListView = true
  isSettingsView = false
  isLoading = false
  onWorkerListChanged = new Subscription()
  selectedWorker: Worker | undefined

  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workers = this.workerService.workers
    if(this.workers.length === 0){
      this.isLoading = true
      this.onWorkerListChanged = this.workerService.list()
      .subscribe({
        next: (workers) => {
          this.workers = workers
          this.isLoading = false
        }
      })
    }
  }

  openSettings(worker: Worker){
    this.isListView = false
    this.isSettingsView = true
    this.selectedWorker = worker
  }

  closeSettings(){
    this.isSettingsView = false
    this.isListView = true
  }

  ngOnDestroy(): void {
    this.onWorkerListChanged.unsubscribe()
  }
}
