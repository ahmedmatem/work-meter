import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Site } from 'src/app/models/Site'

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  sites: Site[] = []

  private siteListSub = new Subscription()

  constructor() { }

  ngOnInit(): void {
  }

}
