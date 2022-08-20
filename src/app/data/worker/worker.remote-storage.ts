import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
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
}