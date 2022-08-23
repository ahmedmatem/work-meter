import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, forkJoin, map, Observable } from "rxjs"
import { Site } from "src/app/models/Site"
import { environment } from "src/environments/environment"

@Injectable({providedIn: 'root'})
export class SiteRemoteStorage {

    constructor(
        private http: HttpClient
    ){ }

    getAll(): Observable<Site[]>{
        const url =  environment.apiBaseUrl + '/sites'
        return this.http.get<any>(url)
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

    // getAllByWorker(id: string): Observable<Site[]>{
    //     const url =  environment.apiBaseUrl + '/sites/byworker/' + id
    //     return this.http.get<any>(url)
    //     .pipe(
    //         map(resData => {
    //             const sites: Site[] = []
    //             for(const key in resData){
    //                 sites.push(new Site(key, resData[key].name, resData[key].address))
    //             }
    //             return sites
    //         })
    //     )
    // }

    // getAllWorkerSites(workerId: string): Observable<[Site[], string[]]>{
    //     return forkJoin([
    //         this.getAllByWorker(workerId), // request all sites
    //         this.getWorkerSites(workerId) // request worker site's ids
    //       ])
    // }

    /**
     * 
     * @param workerId 
     * @returns array of worker sites ids
     */
    // getWorkerSites(workerId: string): Observable<string[]>{
    //     const url =  environment.apiBaseUrl + `/workers/${workerId}/sites`
    //     return this.http.get<string[]>(url)
    // }

    /**
     * 
     * @param id - worker id
     * @param sites - array of sites ids
     * @returns 
     */
    // setWorkerSites(id: string, sites: string[]) {
    //     const url =  environment.apiBaseUrl + `/workers/${id}/sites`
    //     const body = {sites: sites}
    //     return this.http.post(url, body)
    // }

    save(...sites: Site[]): Observable<{id: string}[]>{
        const sources = <Observable<{id: string}>[]>[]
        sites.forEach(site => {
            const source = this.http.put<{id:string}>(environment.apiBaseUrl + '/sites/add', site)
            sources.push(source)
        })
        return forkJoin(sources)
    }
}