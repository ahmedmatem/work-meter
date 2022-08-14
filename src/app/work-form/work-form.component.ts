import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HomeService } from '../home/home.service'
import { SitesPageService } from '../home/sites-page/sites-page.service'
import { Size, Work } from '../models/Work'

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {
  model = new Work('', new Date(), '', new Size)

  constructor(
    private router: Router,
    private sitePageService: SitesPageService) { }

  ngOnInit(): void { 
    this.model = this.sitePageService.workModel
  }

  openCamera(){
    this.router.navigateByUrl('camera')
  }

}
