import { Injectable } from "@angular/core"
import { Worker } from "src/app/models/Worker"

@Injectable({providedIn: 'root'})
export class WorkerLocalStorage {

    private key: string = 'workers'

    getAll(): Worker[] {
        const workers = localStorage.getItem(this.key)
        return workers ? JSON.parse(workers) : []
    }

    add(...workers: Worker[]){
        // const storedSites: Site[] = this.getAll()
        const storedWorkers: Worker[] = this.getAll()
        
        // Filter workers that are not exist in local storage
        const filteredWorkers = workers.filter((worker) => {
            let exists = false
            storedWorkers.forEach(sw => {
                if(sw.id === worker.id){
                    exists = true
                }
            })
            return !exists
        })

        // Add filtered workers to list of already stored workers
        filteredWorkers.forEach((fw) => {
            storedWorkers.push(fw)
        })

        // Update stored workers with new workers included
        localStorage.setItem(this.key, JSON.stringify(storedWorkers))
    }
}