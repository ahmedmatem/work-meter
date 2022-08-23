import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { Site } from "src/app/models/Site"
import { Worker } from "src/app/models/Worker"
import { environment } from "src/environments/environment"

@Injectable({providedIn: 'root'})
export class WorkerRemoteStorage {

    constructor(private http: HttpClient){}


    getAll():Observable<Worker[]>{
        return this.http.get<any>(environment.apiBaseUrl + '/workers')
        .pipe(
            map(resData => {
                const result: Worker[] = []
                for(const key in resData){
                    result.push(new Worker(key, resData[key].name))
                }
                return result
            })
        )
    }

    getWorkerSites(workerId: string): Observable<Site[]>{
        const url = `${environment.apiBaseUrl}/workers/${workerId}/sites`
        return this.http.get<Site[]>(url)
    }

    setWorkerSites(workerId: string, sites: Site[]): Observable<any> {
        const url =  environment.apiBaseUrl + `/workers/${workerId}/sites`
        const body = {sites: sites}
        return this.http.post(url, body)
    }
}