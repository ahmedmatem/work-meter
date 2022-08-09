import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { forkJoin, map, Observable, Subject } from "rxjs"
import { environment } from "src/environments/environment"
import { Worker } from "../models/Worker"

@Injectable({providedIn: 'root'})
export class WorkerService {
    private _workers: Worker[] = []

    constructor(private http: HttpClient){ }

    get workers() {
        return this._workers.slice()
    }

    list():Observable<Worker[]>{
        return this.http.get<any>(environment.apiBaseUrl + '/workers')
        .pipe(
            map(resData => {
                const result: Worker[] = []
                for(const key in resData){
                    result.push(new Worker(key, resData[key].name))
                }
                this._workers = result
                return this.workers
            })
        )
    }

    getSitesByWorker(id:string): Observable<string[]> {
        return this.http.get<string[]>(environment.apiBaseUrl + `/workers/${id}/sites`)
    }

    setSitesByWorker(id: string, siteIds: string[]): Observable<any> {
        return this.http.post(environment.apiBaseUrl + `/workers/${id}/sites`, {sites: siteIds})
    }
}