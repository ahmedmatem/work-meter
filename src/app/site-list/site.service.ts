import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable, Subject } from "rxjs"
import { environment } from "src/environments/environment"
import { Site } from "../models/Site"

@Injectable({ providedIn: 'root'})
export class SiteService {
    selectedSite = new BehaviorSubject<Site|null>(null)
    private _sites: Site[] = []

    get sites() {
        return this._sites.slice()
    }

    onSitesListChanged = new Subject<Site[]>()

    constructor(private http: HttpClient){}

    list(): Observable<Site[]>{
        return this.http.get<any>(environment.apiBaseUrl + '/sites')
        .pipe(
            map(resData => {
                const result: Site[] = []
                for(const key in resData){
                    result.push(new Site(key, resData[key].name, resData[key].address))
                }
                this._sites = result
                return this.sites
            })
        )
    }

    /**
     * Retrieves all sites for worker
     * @param id
     * @returns 
     */
    listByWorker(id: string): Observable<Site[]>{
        return this.http.get<any>(environment.apiBaseUrl + `/sites/byWorker/${id}`)
        .pipe(
            map(resData => {
                const result: Site[] = []
                for(const key in resData){
                    result.push(new Site(key, resData[key].name, resData[key].address))
                }
                this._sites = result
                return this.sites
            })
        )
    }

    save(site: Site){
        this.http.put<{id:string}>(environment.apiBaseUrl + '/sites/add', site)
        .subscribe(resData => {
            site.id = resData.id
            this._sites.push(site)
            this.onSitesListChanged.next(this.sites)
        })
    }
}