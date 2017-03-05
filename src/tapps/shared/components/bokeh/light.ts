export interface LightMovement {
  x: number;
  y: number;
  angle: number;
  velocity: number;
}

/*
public radiusMin: number = 1,
public radiusMax: number = 100,
public blurMin: number = 10,
public blurMax: number = 100,
public hueMin: number = 0,
public hueMax: number = 360,
public saturationMin: number = 10,
public saturationMax: number = 70,
public lightnessMin: number = 20,
public lightnessMax: number = 50,
public alphaMin: number = 0.1,
public alphaMax: number = 0.5,
*/

export class Light implements LightMovement {
  public x: number;
  public y: number;
  public angle: number;
  public velocity: number;

  constructor(
    public radius: number = 50,
    public blur: number = 55,
    public hue: number = 180,
    public saturation: number = 40,
    public lightness: number = 35,
    public alpha: number = 0.3,
  ) {

  }

  public setMovement(movement: LightMovement) {
    this.x = movement.x;
    this.y = movement.y;
    this.angle = movement.angle;
    this.velocity = movement.velocity;
  }

  static White(
    radius: number = 1,
    alpha: number = 0.1,
  ) {
    return new Light(radius, 0, 0, 0, 100, alpha);
  }
}