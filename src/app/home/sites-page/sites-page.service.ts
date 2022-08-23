import { Injectable } from "@angular/core"
import { BehaviorSubject, forkJoin, map, Observable } from "rxjs"
import { Site } from "src/app/models/Site"
import { Size, Work } from "src/app/models/Work"
// import { WorkerService } from "src/app/worker-list/worker.service"

@Injectable({providedIn: 'root'})
export class SitesPageService{
    private _workerSites: Site[] = []

    public workModel = new Work('', new Date(), '', new Size)

    constructor(
        // private workerService: WorkerService
        ){ }

    get workerSites() {
        return this._workerSites.slice()
    } 

    // listSitesByWorker(id: string): Observable<Site[]>{
    //     return forkJoin([
    //         this.siteService.listByWorker(id),
    //         this.workerService.getSitesByWorker(id)
    //     ]).pipe(
    //         map(resData => {
    //             const allSites = resData[0]
    //             const workerSitesIds = resData[1]
    //             if(!workerSitesIds){
    //                 return []
    //             }
    //             this._workerSites = allSites.filter(site => {
    //                 return workerSitesIds.includes(site.id!)
    //             })
    //             return this.workerSites
    //         })
    //     )
    // }
}