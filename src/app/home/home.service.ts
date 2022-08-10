import { Injectable } from "@angular/core"
import { forkJoin, map, Observable } from "rxjs"
import { Site } from "../models/Site"
import { SiteService } from "../site-list/site.service"
import { WorkerService } from "../worker-list/worker.service"

@Injectable({providedIn: 'root'})
export class HomeService {

}