import { Inject, Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Site } from "src/app/models/Site"
import { SiteLocalStorage } from "./site.local-storage"
import { SiteRemoteStorage } from "./site.remote-storage"

@Injectable({
    providedIn: 'root'
})
export class SiteRepository {
    private _sites: Site[] = []
    private onSitesLoaded = new Subject<Site[]>()

    get sites() {
        return this._sites.slice()
    }

    constructor (
        @Inject('SITE_LOCAL_STORAGE') private localStorage: SiteLocalStorage,
        @Inject('SITE_REMOTE_STORAGE') private remoteStorage: SiteRemoteStorage
    ){
        this.init()
    }

    private init() {
        this.remoteStorage.getAll().subscribe({
            next: (remoteSites) => {
                this._sites = remoteSites
                // Save sites in local storage
                this.localStorage.add(...this._sites)              
            },
            error: (err) => {
                // Try to get all from local storage
                this._sites = this.localStorage.getAll()
            },
            complete: () => {
                this.onSitesLoaded.next(this.sites)
            }
        })
    }

    getAll(): Subject<Site[]>{
        return this.onSitesLoaded
    }

    add(...sites: Site[]) {
        this.localStorage.add(...sites)
        this.remoteStorage.add(...sites)
    }
}