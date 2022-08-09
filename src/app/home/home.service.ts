import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { forkJoin, map, Observable } from "rxjs"
import { Site } from "../models/Site"
import { SiteService } from "../site-list/site.service"
import { WorkerService } from "../worker-list/worker.service"

@Injectable({providedIn: 'root'})
export class HomeService {

    private _workerSites: Site[] = []

    constructor(
        private http: HttpClient,
        private siteService: SiteService,
        private workerService: WorkerService){ }

    get workerSites() {
        return this._workerSites.slice()
    } 

    listSitesByWorker(id: string): Observable<Site[]>{
        return forkJoin([
            this.siteService.listByWorker(id),
            this.workerService.getSitesByWorker(id)
        ]).pipe(
            map(resData => {
                const allSites = resData[0]
                const workerSitesIds = resData[1]
                if(!workerSitesIds){
                    return []
                }
                this._workerSites = allSites.filter(site => {
                    return workerSitesIds.includes(site.id!)
                })
                return this.workerSites
            })
        )
    }
}