import { Injectable } from "@angular/core"
import { Observable, Subject, Subscription } from "rxjs"
import { Site } from "src/app/models/Site"
import { SiteLocalStorage } from "./site.local-storage"
import { SiteRemoteStorage } from "./site.remote-storage"

@Injectable({
    providedIn: 'root'
})
export class SiteRepository{
    private _sites: Site[] = []

    onSiteListChanged = new Subject<Site[]>()
    onSiteCreated = new Subject<Site>()

    private downloadSubscription = new Subscription()

    get sites() {
        return this._sites.slice()
    }

    constructor (
        private localStorage: SiteLocalStorage,
        private remoteStorage: SiteRemoteStorage) { }

    // downloadSitesAsObservable(): Observable<Site[]> {
    //     return this.remoteStorage.getAll()
    // }

    download(): Observable<Site[]>{
        return this.remoteStorage.getAll()
    }

    getAllLocal(): Site[]{
        return this.localStorage.getAll()
    }

    // downloadWorkerSitesAsObservable(id: string): Observable<string[]>{
    //     return this.remoteStorage.getWorkerSites(id)
    // }

    // downloadWorkerSites(id: string){
    //     this.remoteStorage.getAllWorkerSites(id).subscribe({
    //         next: (resData) => {
    //           const allSites = resData[0]
    //           const workerSiteIds = resData[1]
    //           let result: Site[] = []
    //           if(allSites){
    //             if(workerSiteIds){
    //                 allSites.forEach(site => {
    //                     if(workerSiteIds.includes(site.id!)){
    //                         result.push(site)
    //                     }
    //                 })
                    
    //                 this.onSiteListChanged.next(result)
    //             }
    //           }
    //         }
    //       })
    // }

    // setWorkerSites(id: string, sites: string[]){
    //     return this.remoteStorage.setWorkerSites(id, sites)
    // }

    saveLocal(sites: Site[]){
        if(!sites) return
        this.localStorage.save(...sites)
    }

    create(site: Site) {
        this.remoteStorage.save(site).subscribe((resData) => {
            // Set id of newly created site by id received from response
            site.id = resData[0].id
            this.onSiteCreated.next(site)           
            this.localStorage.save(site)
        })
    }
}