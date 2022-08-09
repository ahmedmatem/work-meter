import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Worker } from 'src/app/models/Worker'

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.css']
})
export class WorkerItemComponent implements OnInit {
  @Input('worker') worker!: Worker
  @Output() openSettingsEvent = new EventEmitter<Worker>()

  constructor() { }

  ngOnInit(): void {
  }

  openSettings(){
    this.openSettingsEvent.next(this.worker)
  }

}
