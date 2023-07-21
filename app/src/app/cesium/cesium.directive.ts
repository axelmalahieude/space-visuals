import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer, Ion } from 'cesium';

// The URL on your server where CesiumJS's static files are hosted.
(window as any).CESIUM_BASE_URL = '/assets/cesium/';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjMwYzQxNy03NzViLTQwODMtYTEzMS05OGRjODg0OGUxZjciLCJpZCI6MTU0MzI3LCJpYXQiOjE2ODk1Mzk5MTV9.xwmEignTWi1Sx3-qPblE8TPeVZkECGmQwyGSJxAOdE0';

@Directive({
  selector: '[swCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const viewer = new Viewer(this.el.nativeElement);
  }

}