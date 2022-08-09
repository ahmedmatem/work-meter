import { Component, Input, OnInit } from '@angular/core';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-site-item',
  templateUrl: './site-item.component.html',
  styleUrls: ['./site-item.component.css']
})
export class SiteItemComponent implements OnInit {

  @Input('site') site!: Site

  constructor() { }

  ngOnInit(): void {
  }

}
