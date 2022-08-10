import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-sites-tab',
  templateUrl: './sites-tab.component.html',
  styleUrls: ['./sites-tab.component.css']
})
export class SitesTabComponent implements OnInit {
  isLoading: boolean = true

  constructor() { }

  ngOnInit(): void {}
}
