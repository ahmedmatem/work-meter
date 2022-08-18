import { HttpClient } from "@angular/common/http"
import { forkJoin, map, Observable } from "rxjs"
import { AuthService } from "src/app/auth/auth.service"
import { Site } from "src/app/models/Site"
import { environment } from "src/environments/environment"

export class SiteRemoteStorage {

    private _url: string

    constructor(
        authService: AuthService, 
        private http: HttpClient
    ){
        const user = authService.user.value
        this._url = user?.role === 'user' ?
            environment.apiBaseUrl + '/sites/byWorker/' + user.id :
            environment.apiBaseUrl + '/sites'
    }

    getAll(): Observable<Site[]>{
        return this.http.get<any>(this._url)
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

    add(...sites: Site[]): Observable<{id: string}[]>{
        const sources = <Observable<{id: string}>[]>[]
        sites.forEach(site => {
            const source = this.http.put<{id:string}>(environment.apiBaseUrl + '/sites/add', site)
            sources.push(source)
        })
        return forkJoin(sources)
    }
}