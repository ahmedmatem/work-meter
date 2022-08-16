import { AuthService } from "src/app/auth/auth.service"
import { Site } from "src/app/models/Site"

export class SiteLocalStorage {
    private key: string

    constructor(authService: AuthService){
        this.key = authService.user.value?.role === 'user' ? 'worker-sites' : 'sites'
    }

    getAll(): Site[]{
        return localStorage.getItem(this.key) ? 
            JSON.parse(localStorage.getItem(this.key)!) : []
    }

    add(...sites: Site[]){
        const storedSites: Site[] = this.getAll()

        sites.forEach((site) => {
            storedSites.push(site)
        })

        localStorage.setItem(this.key, JSON.stringify(storedSites))
    }
}