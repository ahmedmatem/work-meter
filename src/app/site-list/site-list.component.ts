import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { SiteRepository } from '../data/site/site-repository'
import { Site } from '../models/Site'
import { SiteService } from './site.service'

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  // sites: Site[] = []
  // isLoading: boolean = false
  // closeResult!: string
  // private onSitesListChangedSub = new Subscription()
  @Input('sites') sites: Site[] = []

  constructor(
    // private modalService: NgbModal,
    // private siteService: SiteService
  ) { }

  ngOnInit(): void {
    // // Read sites from memory
    // this.sites = this.siteService.sites
    
    // // If no sites in memory list all from server
    // if(this.sites.length === 0){
    //   // list all sites
    //   this.isLoading = true
    //   this.siteService.list().subscribe({
    //     next: (sites) => {
    //       this.sites = sites
    //       this.isLoading = false
    //     }
    //   })
    // }

    // // subscribe to site list cnahge
    // this.onSitesListChangedSub = this.siteService.onSitesListChanged.subscribe({
    //   next: (sites: Site[]) => {
    //     this.sites = sites
    //   }
    // })
  }
  
  // ngOnDestroy(): void {
  //   this.onSitesListChangedSub.unsubscribe()
  // }

  // openNewSiteForm(content: TemplateRef<any>){
  //   this.modalService.open(
  //     content, {
  //       ariaLabelledBy: 'modal-basic-title',
  //       size: 'xl'
  //     }).result
  //   .then(
  //     (result) => {
  //       this.closeResult = `Closed with ${result}`
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
  //     }
  //   )
  // }

  // saveNewSite(formData: any){
  //   const site: Site = new Site(null, formData.siteName, formData.siteAddress)
  //   this.siteService.save(site)
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
