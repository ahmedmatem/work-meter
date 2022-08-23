import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs"
import { AuthService } from "../auth/auth.service"
import { SiteRepository } from "../data/site/site-repository"
import { WorkerRepository } from "../data/worker/worker-repository"
import { Site } from "../models/Site"
import { Size, Work } from "../models/Work"

@Injectable({providedIn: 'root'})
export class HomeService {
    private _workerId: string
    private _workerSites: Site[] = []

    siteListChangedSubject = new Subject<Site[]>()
    selectedSite = new BehaviorSubject<Site|null>(null)
    workModel = new Work('', new Date(), '', new Size)

    get workerSites() {
        return this._workerSites.slice()
    } 

    constructor(
        private siteRepo: SiteRepository,
        private workRepo: WorkerRepository,
        auth: AuthService){ 

        this._workerId = auth.user?.value?.id!

        // Get worker sites from local storage
        this._workerSites = this.siteRepo.getAllLocal()

        // // Subscribe on onSiteListChanged event
        // this.siteRepo.onSiteListChanged.subscribe({
        //     next: (sites) => {
        //         this._workerSites = sites
        //         this.siteListSubject.next(sites)
        //         this.siteRepo.saveLocal(sites)
        //     }
        // })
        // and daownload sites
        
        this.workRepo.downloadWorkerSites(this._workerId).subscribe({
            next: (sites) => {
                this._workerSites = sites
                this.siteListChangedSubject.next(sites)
                this.siteRepo.saveLocal(sites)
            },
            error: (err) => {
                console.log('Error: ${err}')
            }
        })
    }

}