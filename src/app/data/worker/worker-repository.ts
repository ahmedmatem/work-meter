import { Inject, Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { Site } from "src/app/models/Site"
import { Worker } from "src/app/models/Worker"
import { WorkerLocalStorage } from "./worker.local-storage"
import { WorkerRemoteStorage } from "./worker.remote-storage"

@Injectable({providedIn: 'root'})
export class WorkerRepository {
    private _workers: Worker[] = []

    onWorkerListChanged = new Subject<Worker[]>()
    // onSiteCreated = new Subject<Site>()

    get workers() {
        return this._workers.slice()
    }

    constructor(
        private localStorage: WorkerLocalStorage,
        private remoteStorage: WorkerRemoteStorage ){}

    downloadWorkers(){
        this.remoteStorage.getAll().subscribe({
            next: (workers) => {
                this._workers = workers
                this.onWorkerListChanged.next(this.workers)
                this.localStorage.add(...workers)
            }
        })
    }

    downloadWorkerSites(workerId: string): Observable<Site[]>{
        return this.remoteStorage.getWorkerSites(workerId)
    }

    updateWorkerSites(workerId: string, sites: Site[]): Observable<any>{
        return this.remoteStorage.setWorkerSites(workerId, sites)
    }
}