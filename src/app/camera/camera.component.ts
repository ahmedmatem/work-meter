import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { mediaSupported } from '../app.config'

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  @ViewChild('player') player!: ElementRef
  context!: CanvasRenderingContext2D | null

  isCaptured = false

  constraints = { video: true }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startVideo()
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')
  }

  capture(){
    const width = this.canvas.nativeElement.width
    const height = this.canvas.nativeElement.height
    this.context?.drawImage(this.player.nativeElement, 0, 0, width, height)

    // Stop all video streams. 
    this.stopVideo()
    
    this.isCaptured = true
  }

  back(){
    if(this.isCaptured){
      this.resumeVideo()
    } else {
      this.router.navigate(['home/add-work'])
    }
  }

  cancel(){
    this.router.navigate(['home/add-work'])
  }
  
  ngOnDestroy(): void {
    // Stop all video streams. 
    this.stopVideo()
  }

  private startVideo() {
    if(mediaSupported){
      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        this.player.nativeElement.srcObject = stream
      })
    }
  }

  private resumeVideo(){
    this.isCaptured = false
    this.startVideo()
  }

  private stopVideo(){
    // Stop all video streams. 
    if(this.player){
      const videoTracks = this.player.nativeElement.srcObject.getVideoTracks() as Array<MediaStreamTrack>
      videoTracks.forEach((track) => {
        track.stop()
      })
    }
  }
}
