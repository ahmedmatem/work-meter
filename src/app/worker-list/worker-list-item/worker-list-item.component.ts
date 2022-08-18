import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Worker } from 'src/app/models/Worker'

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-list-item.component.html',
  styleUrls: ['./worker-list-item.component.css']
})
export class WorkerListItemComponent implements OnInit {
  @Input() role!: string
  @Input('worker') worker!: Worker
  @Output() openSettingsEvent = new EventEmitter<Worker>()

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  openSettings(){
    this.openSettingsEvent.next(this.worker)
  }

}
