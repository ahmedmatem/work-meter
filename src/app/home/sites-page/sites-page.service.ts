import { Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { Site } from "src/app/models/Site";
import { SiteService } from "src/app/site-list/site.service";
import { WorkerService } from "src/app/worker-list/worker.service";

@Injectable({providedIn: 'root'})
export class SitesPageService{
    private _workerSites: Site[] = []

    constructor(
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