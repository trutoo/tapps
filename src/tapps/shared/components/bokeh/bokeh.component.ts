import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MathX } from '../../utilities/mathx';
import { Color } from '../../utilities/color';

export class LightParams {
  public radiusMin: number = 1;
  public radiusMax: number = 100;
  public blurMin: number = 10;
  public blurMax: number = 100;
  public hueMin: number = 0;
  public hueMax: number = 360;
  public saturationMin: number = 10;
  public saturationMax: number = 70;
  public lightnessMin: number = 20;
  public lightnessMax: number = 50;
  public alphaMin: number = 0.1;
  public alphaMax: number = 0.5;
}

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
    this.ctx.globalCompositeOperation = 'lighter';

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
  }

  private createLight(params: LightParams) {
    this.ctx.shadowColor = Color.hsla(
      MathX.randomBetween(params.hueMin, params.hueMax),
      MathX.randomBetween(params.saturationMin, params.saturationMax),
      MathX.randomBetween(params.lightnessMin, params.lightnessMax),
      MathX.randomBetween(params.alphaMin, params.alphaMax)
    );
    this.ctx.shadowBlur = MathX.randomBetween(params.blurMin, params.blurMax);
    this.ctx.beginPath();
    this.ctx.arc(
      MathX.randomBetween(0, this.canvas.width),
      MathX.randomBetween(0, this.canvas.height),
      MathX.randomBetween(params.radiusMin, params.radiusMax),
      0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  static randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  static hsla(h: number, s: number, l: number, a: number) {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }
}