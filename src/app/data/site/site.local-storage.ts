import { Injectable } from "@angular/core"
import { AuthService } from "src/app/auth/auth.service"
import { Site } from "src/app/models/Site"

@Injectable({providedIn: 'root'})
export class SiteLocalStorage {
    private key: string

    constructor(authService: AuthService){
        this.key = authService.user.value?.role === 'user' ? 'worker-sites' : 'sites'
    }

    getAll(): Site[]{
        return localStorage.getItem(this.key) ? 
            JSON.parse(localStorage.getItem(this.key)!) : []
    }

    /**
     * Save site/s in local storage if required - 
     * skip those that already exist in the storage.
     * @param sites
     */
    save(...sites: Site[]){
        const storedSites: Site[] = this.getAll()
        
        // Filter sites that are not exist in local storage
        const filteredSites = sites.filter((site) => {
            let exists = false
            storedSites.forEach(ss => {
                if(ss.id === site.id){
                    exists = true
                }
            })
            return !exists
        })

        // Add filtered sides to list of already stored sites
        filteredSites.forEach((fs) => {
            storedSites.push(fs)
        })

        // Update stored sites with new sites included
        localStorage.setItem(this.key, JSON.stringify(storedSites))
    }

}