import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { WorkerRepository } from 'src/app/data/worker/worker-repository'
import { Worker } from 'src/app/models/Worker'

@Component({
  selector: 'app-workers-tab',
  templateUrl: './workers-tab.component.html',
  styleUrls: ['./workers-tab.component.css']
})
export class WorkersTabComponent implements OnInit {
  isLoading = false
  workers: Worker[] = []

  private onWorkerListChangedSub = new Subscription()

  constructor(private workerRepo: WorkerRepository) { }

  ngOnInit(): void {
    this.onWorkerListChangedSub = this.workerRepo.onWorkerListChanged.subscribe((workers) => {
      this.isLoading = false
      this.workers = workers
    })    

    this.workers = this.workerRepo.workers
    if(this.workers){
      this.isLoading = true
      this.workerRepo.downloadWorkers()
    }
  }

}
