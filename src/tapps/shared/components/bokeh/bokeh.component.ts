import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MathX } from '../../utilities/mathx';
import { Color } from '../../utilities/color';
import { Light, LightMovement } from './light';

@Component({
  selector: 'c-bokeh',
  templateUrl: './bokeh.component.html',
  styleUrls: ['./bokeh.component.css']
})

export class BokehComponent implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private lights: {
    background: Set<Light>,
    foreground: Set<Light>,
  }

  constructor() {
    this.onResize = this.onResize.bind(this);
    this.onRender = this.onRender.bind(this);
  }

  ngOnInit() {
    this.lights = {
      background: new Set<Light>(),
      foreground: new Set<Light>(),
    };
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.onResize();
    this.createBackground();
    this.createForeground();
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

    /* Background */
    this.ctx.globalCompositeOperation = 'source-over';
    this.lights.background.forEach((light: Light) => {
      this.renderLight(light);
    });

    /* Foreground */
    this.ctx.globalCompositeOperation = 'lighter';

    this.lights.foreground.forEach((light: Light) => {
      light.x += Math.cos(light.angle) * light.velocity;
      light.y += Math.sin(light.angle) * light.velocity;
      light.angle += MathX.randomBetween(-0.05, 0.05);

      this.renderLight(light);

      if (light.x - light.radius > this.canvas.width) { light.x = -light.radius }
      if (light.x + light.radius < 0) { light.x = this.canvas.width + light.radius }
      if (light.y - light.radius > this.canvas.height) { light.y = -light.radius }
      if (light.y + light.radius < 0) { light.y = this.canvas.height + light.radius }
    });
  }

  private renderLight(light: Light) {
    const color = Color.hsla(light.hue, light.saturation, light.lightness, light.alpha);
    this.ctx.fillStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = light.blur;
    this.ctx.beginPath();
    this.ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  //------------------------------------------------------------------------------------
  // CREATORS
  //------------------------------------------------------------------------------------

  private createBackground() {
    const sizeBase = this.canvas.width + this.canvas.height;
    for (var i = 0; i < sizeBase * 0.03; i++) {
      const light = new Light(
        MathX.randomBetween(1, sizeBase * 0.04),
        MathX.randomBetween(10, sizeBase * 0.04),
        MathX.randomBetween(0, 360),
        MathX.randomBetween(10, 70),
        MathX.randomBetween(20, 50),
        MathX.randomBetween(0.1, 0.5),
      );
      light.setMovement({
        x: MathX.randomBetween(0, this.canvas.width),
        y: MathX.randomBetween(0, this.canvas.height),
        angle: 0,
        velocity: 0,
      });
      this.lights.background.add(light);
      this.renderLight(light);
    }
  }

  private createForeground() {
    const sizeBase = this.canvas.width + this.canvas.height;
    for (var i = 0; i < sizeBase * 0.03; i++) {
      const light = Light.White(
        MathX.randomBetween(1, sizeBase * 0.04),
        MathX.randomBetween(0.1, 0.5),
      );
      light.setMovement({
        x: MathX.randomBetween(0, this.canvas.width),
        y: MathX.randomBetween(0, this.canvas.height),
        angle: MathX.randomBetween(0, Math.PI),
        velocity: MathX.randomBetween(0.1, 0.5),
      });
      this.lights.foreground.add(light);
      this.renderLight(light);
    }
  }
}