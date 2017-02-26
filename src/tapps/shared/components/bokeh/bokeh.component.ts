import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'c-bokeh',
  templateUrl: './bokeh.component.html',
  styleUrls: ['./bokeh.component.css']
})

export class BokehComponent implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.onResize = this.onResize.bind(this);
    this.onRender = this.onRender.bind(this);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.onResize();
    this.onRender()

    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  private onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private onRender() {
    window.requestAnimationFrame(this.onRender);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.canvas.width);
  }
}