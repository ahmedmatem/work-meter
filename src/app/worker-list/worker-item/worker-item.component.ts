import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Worker } from 'src/app/models/Worker'

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.css']
})
export class WorkerItemComponent implements OnInit {
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
