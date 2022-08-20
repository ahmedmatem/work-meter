import { Inject, Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { Site } from "src/app/models/Site"
import { SiteLocalStorage } from "./site.local-storage"
import { SiteRemoteStorage } from "./site.remote-storage"

@Injectable({
    providedIn: 'root'
})
export class SiteRepository {
    private _sites: Site[] = []

    onSiteListChanged = new Subject<Site[]>()
    onSiteCreated = new Subject<Site>()

    get sites() {
        return this._sites.slice()
    }

    constructor (
        private localStorage: SiteLocalStorage,
        private remoteStorage: SiteRemoteStorage) { }

    downloadSitesAsObservable(): Observable<Site[]> {
        return this.remoteStorage.getAll()
    }

    downloadSites(){
        this.remoteStorage.getAll().subscribe({
            next: (remoteSites) => {
                this._sites = remoteSites
                // Trigger onSiteListChanged event
                this.onSiteListChanged.next(this.sites)
                // Add sites in local storage if required
                this.localStorage.add(...this._sites)              
            }
        })
    }

    downloadWorkerSitesAsObservable(id: string): Observable<string[]>{
        return this.remoteStorage.getWorkerSites(id)
    }

    downloadWorkerSites(id: string){
        this.remoteStorage.getWorkerSites(id).subscribe({
            next: (ids => {
                console.log('Print ids:')
                console.log(ids)
            })
        })
    }

    setWorkerSites(id: string, sites: string[]){
        return this.remoteStorage.setWorkerSites(id, sites)
    }

    create(site: Site) {
        this.remoteStorage.add(site).subscribe((resData) => {
            // Set id of newly created site by id received from response
            site.id = resData[0].id
            this.onSiteCreated.next(site)           
            this.localStorage.add(site)
        })
    }
}