import { TappsStore } from '../../../tapps.store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MathX } from '../../utilities/mathx';
import { Color } from '../../utilities/color';
import { Light, LightMovement } from './light';

export interface Theme {
  primary: string;
  secondary: string;
}

export interface BokehLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lights: Set<Light>;
}

@Component({
  selector: 'c-bokeh',
  templateUrl: './bokeh.component.html',
  styleUrls: ['./bokeh.component.css']
})

export class BokehComponent implements OnInit {

  @ViewChild('background') backgroundRef: ElementRef;
  @ViewChild('foreground') foregroundRef: ElementRef;

  private back: BokehLayer;
  private fore: BokehLayer;
  private theme: Theme;

  constructor(
    private store: TappsStore,
  ) {
    this.onResize = this.onResize.bind(this);
    this.onRender = this.onRender.bind(this);
    this.store.changes.pluck('theme').subscribe((theme: Theme) => {
      if (!theme) return;
      this.theme = theme;
      if (!this.back) return;
      this.back.ctx.clearRect(0, 0, this.fore.canvas.width, this.fore.canvas.height);
      this.back.lights.clear();
      this.createBackground();
      this.renderBackground();
    });
  }

  ngOnInit() {
    var test = Color.FromAlphaHex('#90ef629f');
    console.log(test.r, test.g, test.b, test.a);
    console.log(test.h, test.s, test.l, test.a);
    console.log(test.toHSLA());
    //const color = Color.toHSLA(light.hue, light.saturation, light.lightness, light.alpha);


  }

  ngAfterViewInit() {
    this.back = {
      canvas: this.backgroundRef.nativeElement,
      ctx: this.backgroundRef.nativeElement.getContext('2d'),
      lights: new Set<Light>(),
    };
    this.fore = {
      canvas: this.foregroundRef.nativeElement,
      ctx: this.foregroundRef.nativeElement.getContext('2d'),
      lights: new Set<Light>(),
    };
    this.onResize();
    this.createBackground();
    this.renderBackground();
    this.createForeground();
    this.onRender()

    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    this.back.ctx.clearRect(0, 0, this.back.canvas.width, this.back.canvas.height);
    this.fore.ctx.clearRect(0, 0, this.fore.canvas.width, this.fore.canvas.height);
    this.back.lights.clear();
    this.fore.lights.clear();
    this.back = null;
    this.fore = null;
    window.removeEventListener('resize', this.onResize);
  }

  private onResize() {
    this.back.canvas.width = this.fore.canvas.width = window.innerWidth;
    this.back.canvas.height = this.fore.canvas.height = window.innerHeight;
    this.renderBackground();
  }

  private onRender() {
    if (!this.back || !this.fore)
      return;

    window.requestAnimationFrame(this.onRender);
    this.fore.ctx.clearRect(0, 0, this.fore.canvas.width, this.fore.canvas.height);
    this.fore.ctx.globalCompositeOperation = 'source-over';
    this.fore.ctx.drawImage(this.back.canvas, 0, 0);

    /* Foreground */
    this.fore.lights.forEach((light: Light) => {
      light.x += Math.cos(light.angle) * light.velocity;
      light.y += Math.sin(light.angle) * light.velocity;
      light.angle += MathX.randomBetween(-0.05, 0.05);

      this.renderLight(this.fore.ctx, light);

      if (light.x - light.radius > this.fore.canvas.width) { light.x = -light.radius }
      if (light.x + light.radius < 0) { light.x = this.fore.canvas.width + light.radius }
      if (light.y - light.radius > this.fore.canvas.height) { light.y = -light.radius }
      if (light.y + light.radius < 0) { light.y = this.fore.canvas.height + light.radius }
    });
  }

  private renderBackground() {
    const gradient = this.back.ctx.createLinearGradient(0, 0, this.back.canvas.width, this.back.canvas.height);
    gradient.addColorStop(0, this.theme.primary);
    gradient.addColorStop(1, this.theme.secondary);
    this.back.ctx.fillStyle = gradient;
    this.back.ctx.fillRect(0, 0, this.back.canvas.width, this.back.canvas.height);

    this.back.ctx.globalCompositeOperation = 'lighter';
    this.back.lights.forEach((light: Light) => {
      this.renderLight(this.back.ctx, light);
    });
  }

  private renderLight(context: CanvasRenderingContext2D, light: Light) {
    this.fore.ctx.globalCompositeOperation = 'lighter';
    const color = 'brown';
    //const color = Color.toHSLA(light.hue, light.saturation, light.lightness, light.alpha);
    if (light.blur > 0)
      context.fillStyle = 'black';
    else
      context.fillStyle = color;
    context.shadowColor = color;
    context.shadowBlur = light.blur;
    context.beginPath();
    context.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  //------------------------------------------------------------------------------------
  // CREATORS
  //------------------------------------------------------------------------------------

  private createBackground() {
    const sizeBase = this.fore.canvas.width + this.fore.canvas.height;
    const hueBase = MathX.randomBetween(0, 360);
    this.back.lights.clear();
    for (var i = 0; i < sizeBase * 0.1; i++) {
      const light = new Light(
        MathX.randomBetween(1, sizeBase * 0.02), // Radius
        MathX.randomBetween(10, sizeBase * 0.02), // Blur
        MathX.randomBetween(hueBase, hueBase + 100), // Color
        MathX.randomBetween(10, 70), // Saturation
        MathX.randomBetween(20, 50), // Brightness
        MathX.randomBetween(0.05, 0.2), // Alpha
      );
      light.setMovement({
        x: MathX.randomBetween(0, this.fore.canvas.width),
        y: MathX.randomBetween(0, this.fore.canvas.height),
        angle: 0,
        velocity: 0,
      });
      this.back.lights.add(light);
    }
  }

  private createForeground() {
    const sizeBase = this.fore.canvas.width + this.fore.canvas.height;
    this.fore.lights.clear();
    for (var i = 0; i < sizeBase * 0.01; i++) {
      const light = Light.White(
        MathX.randomBetween(1, sizeBase * 0.01), // Radius
        MathX.randomBetween(0.05, 0.1), // Alpha
      );
      light.setMovement({
        x: MathX.randomBetween(0, this.fore.canvas.width),
        y: MathX.randomBetween(0, this.fore.canvas.height),
        angle: MathX.randomBetween(0, Math.PI),
        velocity: MathX.randomBetween(0.05, 0.2),
      });
      this.fore.lights.add(light);
    }
  }
}