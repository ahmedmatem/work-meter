import { HttpClient } from "@angular/common/http"
import { map, Observable, Subject } from "rxjs"
import { Site } from "src/app/models/Site"
import { environment } from "src/environments/environment"

export class SiteRemote {
    // onSitesListChanged = new Subject<Site[]>()

    private _sites: Site[] = []

    get sites() {
        return this._sites.slice()
    }

    constructor(private http: HttpClient){}

    getAll(): Observable<Site[]>{
        return this.http.get<any>(environment.apiBaseUrl + '/sites')
        .pipe(
            map(resData => {
                const sites: Site[] = []
                for(const key in resData){
                    sites.push(new Site(key, resData[key].name, resData[key].address))
                }
                return sites
            })
        )
    }

    /**
     * Retrieves all sites for worker
     * @param id
     * @returns 
     */
    getAllByWorker(id: string): Observable<Site[]>{
        return this.http.get<any>(environment.apiBaseUrl + `/sites/byWorker/${id}`)
        .pipe(
            map(resData => {
                const sites: Site[] = []
                for(const key in resData){
                    sites.push(new Site(key, resData[key].name, resData[key].address))
                }
                return sites
            })
        )
    }

    add(site: Site){
        this.http.put<{id:string}>(environment.apiBaseUrl + '/sites/add', site)
        .subscribe(resData => {
            site.id = resData.id
            this._sites.push(site)
            // this.onSitesListChanged.next(this.sites)
        })
    }
}