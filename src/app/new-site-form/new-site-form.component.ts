import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SiteRepository } from '../data/site/site-repository'
import { Site } from '../models/Site'

@Component({
  selector: 'app-new-site-form',
  templateUrl: './new-site-form.component.html',
  styleUrls: ['./new-site-form.component.css']
})
export class NewSiteFormComponent implements OnInit {
  closeResult!: string
  @ViewChild('content') content!: TemplateRef<any>

  constructor(
    private siteRepo: SiteRepository,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  create(formData: any){
    const site: Site = new Site(null, formData.siteName, formData.siteAddress)
    this.siteRepo.create(site)
  }

  open(){
    this.modalService.open(
      this.content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl'
      }).result
    .then(
      (result) => {
        this.closeResult = `Closed with ${result}`
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
